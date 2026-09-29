# Avril // System Profile

I'm an informatics student, frontend engineer, and security researcher. 

This repository holds the source code for my personal portfolio. It recently underwent a massive structural shift. I stripped away traditional scrolling web layouts and rebuilt it as a pseudo-SPA (Single Page Application) mimicking a Cyberpunk terminal / game main menu. It's minimal, anti-slop, and heavily focused on frontend physics.

## Architecture & Layout
- **Cyberpunk UI**: Deep radial red/black gradients, CRT scanlines, static SVG noise, and custom vignettes. Typography relies purely on local Airstrike and Nasalization fonts for that raw arcade terminal aesthetic.
- **Fluid Mechanics**: Instead of standard CSS hover states and jumpy layout shifts, everything relies on explicit GSAP transforms. The main menu physically shrinks and glides to the side to reveal content tabs without triggering layout thrashing.
- **Terminal Bento**: The content inside the tabs (skills, project modules) utilizes sleek, 20px-rounded Bento Grid panels. Kept clean with pure spacing and subtle cyan glows.

## Core Modules
- **Frontend Eng**: Pushing GSAP to its limits, manipulating the DOM so pixels move like liquid.
- **Backend & Arch**: Python, Node, SQL. Building the invisible data architectures.
- **Linux SysAdmin**: Living in the terminal. Arch Linux ricing, kernel tweaking, and taming Hyprland.
- **Security Research**: Messing around with custom pentesting workflows, breaking vulnerable targets, and writing automation scripts.

## Highlighted Nodes
The system currently indexes three main projects, each seamlessly integrated into the side-menu UI structure:

1. **[AuditX](auditx.html)**
   Native Linux security auditing platform. A QML and Python wrapper that takes messy CLI tools (Nuclei, Gobuster, Metasploit RPC) and slaps them into a clean, centralized GUI.
2. **[E-Management](emanagement.html)**
   Zero-backend finance tracker. Fully client-side state machine. No latency, just instant DOM rendering via LocalStorage.
3. **[Street Photo](photography.html)**
   Raw, unfiltered urban visuals. Shadow manipulation and cinematic grading displayed in a strict asymmetrical grid.

## Tech Stack
- **HTML/CSS**: Structural foundation. Zero UI frameworks. CSS grid and flexbox doing the heavy lifting.
- **Vanilla JS**: No bloated virtual DOMs here. Direct manipulation only.
- **GSAP**: The absolute core of the UI physics and fluid transitions.

## Comm Link
Whether you're looking to collaborate on an exploit script, talk Linux configs, or build some slick frontends, establish a connection:
- **Email**: avrllnx9@gmail.com
- **GitHub**: [Akane-UX](https://github.com/Akane-UX)
- **X**: [Nakame_sh](https://x.com/Nakame_sh)
