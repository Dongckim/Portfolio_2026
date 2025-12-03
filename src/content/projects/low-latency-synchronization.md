---
id: 3
title: 'Low-Latency Synchronization'
description: 'Engineered a Master-Client network architecture achieving ±3 frame synchronization accuracy across multiple standalone VR headsets.'
iconType: 'plane'
youtubeUrl: 'dQw4w9WgXcQ'
gifs:
  - '/project/blend.gif'
  - '/project3-gif2.gif'
  - '/project3-gif3.gif'
technologies:
  - 'Node.js'
  - 'Socket.io'
  - 'Unity'
  - 'C#'
  - 'JSON'
---

Designed a Node.js and Socket.io based server architecture to synchronize video playback across 5+ Meta Quest 3 devices. I implemented a custom NTP-like time synchronization protocol where the client calculates the RTT (Round Trip Time) and sets a global "timeOffset." 

The Master broadcasts a playback command with a future timestamp (e.g., ServerTime + 3000ms), ensuring all clients trigger `VideoPlayer.Play()` simultaneously. Post-test logs confirmed an average frame difference of only -3.3 frames between clients.

## Architecture

The system uses a Master-Client architecture where:

- **Master Device**: Controls playback timing and broadcasts synchronization commands
- **Client Devices**: Calculate network latency and adjust local playback accordingly
- **Synchronization Protocol**: Custom NTP-like protocol for precise timing

## Results

Achieved ±3 frame synchronization accuracy across multiple standalone VR headsets, enabling seamless multi-user experiences.

