# Portfolio MIT - XR Engineer Portfolio

A modern, interactive portfolio website built with React, TypeScript, and React Three Fiber (R3F), featuring holographic visual effects and spatial computing aesthetics.

## Features

- **Interactive Hologram**: Dot-field particle system with letter particles that react to mouse movement
- **3D Wireframe Sphere**: R3F-powered wireframe sphere with mouse-reactive lighting
- **Smooth Animations**: Scroll-based transitions and hover effects
- **MIT Media Lab Aesthetic**: Dark theme with neon blue accents

## Tech Stack

- React 18
- TypeScript
- Vite
- React Three Fiber (@react-three/fiber)
- Three.js
- CSS3

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx           # Hero section with name and links
│   ├── Hologram.tsx       # Canvas-based dot field hologram
│   ├── WireframeSphere.tsx # R3F wireframe sphere
│   ├── Projects.tsx       # Projects section
│   └── ProjectCard.tsx    # Individual project card
├── App.tsx                # Main app component
├── main.tsx              # Entry point
└── styles.css            # Global styles
```

