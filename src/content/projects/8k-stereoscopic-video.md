---
id: 4
title: '8K 360°stereoscopic video with MR passthrough'
description: 'Optimized an 8K video player for mobile VR by implementing a single-pass decoding system for stereoscopic rendering.'
iconType: 'sphere'
youtubeUrl: 'dQw4w9WgXcQ'
gifs:
  - '/project/aespa.gif'
technologies:
  - 'Unity'
  - 'Android (Oculus OS)'
  - 'FFmpeg (Encoding)'
  - 'Meta Quest 3'
---

To play 8K (7680x3840) content on standalone mobile hardware without performance drops, I refactored the rendering pipeline. Instead of using two separate video players for left/right eyes, I implemented a single `VideoPlayer` instance that decodes the texture once.

I then mapped this single texture to two separate spheres with offset UV coordinates (Left: u=0.0~0.5, Right: u=0.5~1.0) using a custom material property block. This reduced memory overhead significantly while maintaining high-fidelity stereoscopic 3D output overlaid on the MR Passthrough underlay.

## Optimization Strategy

- **Single-Pass Decoding**: One video player instance instead of two
- **UV Coordinate Mapping**: Efficient texture sharing between eyes
- **Memory Reduction**: Significant decrease in memory overhead
- **Performance**: Maintained high-fidelity output on mobile hardware

## Technical Details

The implementation uses Unity's VideoPlayer API with custom material property blocks to achieve efficient stereoscopic rendering on Meta Quest 3.

