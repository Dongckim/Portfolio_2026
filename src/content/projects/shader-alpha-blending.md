---
id: 2
title: 'Shader-based Alpha Blending in VR'
description: 'Developed a custom shader pipeline to create a seamless, gradient-based transition between the VR 360° environment and the MR Passthrough layer.'
iconType: 'dots'
youtubeUrl: 'dQw4w9WgXcQ'
gifs:
  - '/project/sync.gif'
technologies:
  - 'Unity'
  - 'HLSL (ShaderLab)'
  - 'C#'
  - 'Meta Passthrough API'
---

To achieve a natural "Blended Reality" effect where the VR concert footage fades into the real world at the user's periphery, I wrote a custom Vertex and Fragment shader using HLSL. 

The shader calculates the "blendAlpha" based on the Y-axis world position (Vertex Shader) and applies it to the texture coordinates (Fragment Shader). I utilized `Blend SrcAlpha OneMinusSrcAlpha` with `ZWrite Off` and `Cull Off` to ensure smooth double-sided rendering without depth buffer conflicts, enabling a dynamic opacity transition based on the user's viewing angle.

## Shader Pipeline

The custom shader implements a sophisticated blending system that:

- Calculates alpha values based on world position
- Applies gradient transitions smoothly
- Handles double-sided rendering correctly
- Avoids depth buffer conflicts

## Results

The implementation resulted in a seamless transition between virtual and real environments, creating an immersive blended reality experience for users.

