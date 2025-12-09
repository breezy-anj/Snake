# Terminal Snake 🐍

A terminal-based implementation of the classic Snake game written in Node.js.

## 📋 Description

This project runs entirely in the command line interface (CLI). It utilizes standard Node.js libraries (`readline` and `process`) to handle raw input and rendering, requiring no external dependencies or browser environment.

## 🎮 Features

* **Zero Dependencies:** Runs on standard Node.js.
* **Vim Navigation:** Supports `H`, `J`, `K`, `L` keys for movement (in addition to WASD and Arrows).
* **Collision Detection:** accurately detects wall impacts and self-collision.
* **Win State:** logic handles the rare event of filling the entire grid.

## 🚀 Getting Started

### Prerequisites

* Node.js installed on your machine.

### Installation & Run

1.  Clone this repository or download the source code.
2.  Navigate to the project directory.
3.  Run the game using node:

```bash
node snake.js
