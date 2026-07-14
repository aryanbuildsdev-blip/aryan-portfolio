# Immersive Cinematic Developer Portfolio — Aryan Kumar

An award-winning-style developer portfolio website designed for **Aryan Kumar**, built with **React, Vite, Three.js (via React Three Fiber & Drei), Framer Motion, Lenis, and Tailwind CSS v4**.

---

## 🚀 Technology Stack

- **Framework**: React + Vite (Fast compilation, high HMR performance)
- **3D graphics**: Three.js via `@react-three/fiber` and `@react-three/drei`
- **Animations**: `framer-motion` for scroll-triggered events and custom spring cursor transitions
- **Smooth Scroll**: `lenis` for inertial smooth physics scrolling
- **Styling**: `tailwindcss` v4 (CSS-native configuration plugin)
- **Charts / Dashboards**: `recharts` for case-study data simulation

---

## 🎨 Key Features

1. **Tasteful Preloader**: Counts from `00` to `100%` while cycling through engineering categories and performing a smooth curtain exit.
2. **Interactive 3D Particle Hero**: A glowing golden-spiral particle sphere/knot that reacts directly to pointer coordinates (hover parallax) and scatters or scales down on scroll.
3. **Custom cursor**: Dual-circle cursor utilizing Framer Motion spring physics that morphs, scales, and adds text labels depending on hovered attributes.
4. **Cinematic Case Studies**: Smooth full-screen modal overlays displaying extensive documentation, spec files, and **Recharts simulations** representing project analytical outputs.
5. **Responsive & Mobile Friendly**: Fully responsive styling, with automatic WebGL Canvas degradation on smaller widths (`< 768px`) for high-performance rendering.
6. **Lighthouse & SEO Ready**: Structured with semantic tags, SEO descriptions, Open Graph parameters, and optimized bundle configurations.

---

## 💻 Local Development Setup

To run this project locally, ensure you have **Node.js (v18+)** installed.

1. **Navigate to project directory**:
   ```bash
   cd aryan-portfolio
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Launch local development server**:
   ```bash
   npm run dev
   ```

4. **Compile production build**:
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture

```
aryan-portfolio/
├── public/                 # Static assets (Favicons, images)
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx # Smooth spring cursor tracking
│   │   ├── Preloader.jsx    # Cinematic entrance counting screen
│   │   ├── HeroScene.jsx    # WebGL canvas with rotating particles
│   │   └── ProjectModal.jsx # Full-screen case study details with Recharts
│   ├── App.css             # Empty CSS helper sheet
│   ├── index.css           # Google Fonts imports, Tailwind v4, & global design tokens
│   ├── main.jsx            # Entry mount logic
│   └── App.jsx             # Section compiler and scroll controls
├── index.html              # Core HTML structure, meta headers, & SEO keys
├── vite.config.js          # Vite config with Tailwind CSS v4 compiler plugin
└── package.json            # Script targets and package lock-ins
```

---

## 🎯 Profile Metadata Summary

- **Name**: Aryan Kumar
- **Role**: Computer Science Engineering Student @ ITER, SOA University, Bhubaneswar
- **Primary stack**: Python, Java, Flask, React, Scikit-learn
- **Location**: Bhubaneswar, Odisha, India
- **Status**: Open to work (On-site / Hybrid)
