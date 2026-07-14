import React, { useEffect, useRef } from 'react';

export default function HeroScene() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse coordinates in relative scale [-1, 1]
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.targetX = (x / width) * 2 - 1;
      mouseRef.current.targetY = (y / height) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate 3D sphere points (Golden Spiral distribution)
    const particleCount = 420;
    const particles = [];
    let sphereRadius = Math.min(width, height) * 0.22;

    const generatePoints = () => {
      particles.length = 0;
      sphereRadius = Math.min(width, height) * 0.22;
      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;

        particles.push({
          x: sphereRadius * Math.sin(phi) * Math.cos(theta),
          y: sphereRadius * Math.sin(phi) * Math.sin(theta),
          z: sphereRadius * Math.cos(phi),
        });
      }
    };
    generatePoints();

    // Add background stars (Denser field)
    const starCount = 380;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 450 + 50,
        size: Math.random() * 1.3 + 0.3,
        opacity: Math.random() * 0.45 + 0.15,
      });
    }

    let angleX = 0;
    let angleY = 0;
    const fov = 450; // perspective depth FOV

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Base rotation angles influenced by mouse drift
      angleY += 0.0025 + mouseRef.current.x * 0.004;
      angleX += 0.0012 + mouseRef.current.y * 0.004;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Draw background stars with parallax
      stars.forEach((star) => {
        const px = width / 2 + star.x - mouseRef.current.x * star.z * 0.08;
        const py = height / 2 + star.y - mouseRef.current.y * star.z * 0.08;
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(px, py, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Project and rotate particles
      const rotatedParticles = particles.map((p) => {
        // Rotate Y axis
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X axis
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        return { x: x1, y: y2, z: z2 };
      });

      // Painter's algorithm: sort by depth so front particles draw over back ones
      rotatedParticles.sort((a, b) => b.z - a.z);

      // Render sphere particles
      rotatedParticles.forEach((p) => {
        const scale = fov / (fov + p.z);
        const projX = width / 2 + p.x * scale;
        const projY = height / 2 + p.y * scale;

        if (projX < 0 || projX > width || projY < 0 || projY > height) return;

        // Size and opacity scaling based on depth
        const radius = Math.max(0.1, (1.8 + (p.z / sphereRadius) * 0.8) * scale * 0.95);
        const opacity = Math.min(1, Math.max(0.06, 0.45 + (p.z / sphereRadius) * 0.35));

        // Fade colors smoothly from Front (Violet: 139, 92, 246) to Back (Cyan: 34, 211, 238)
        const t = (p.z + sphereRadius) / (sphereRadius * 2); // [0, 1] range
        const r = Math.round(34 + t * 105);
        const g = Math.round(211 - t * 119);
        const b = Math.round(238 + t * 8);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}
