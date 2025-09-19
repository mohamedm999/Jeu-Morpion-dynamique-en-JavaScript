# Tic-Tac-Toe Game - Function Documentation

This directory contains detailed documentation for all functions in the Tic-Tac-Toe game project.

## Documentation Structure

- **[App Functions](./app.md)** - Application initialization and entry point functions
- **[Game Logic Functions](./gameLogic.md)** - Core game mechanics and business logic
- **[UI Functions](./ui.md)** - User interface management and DOM manipulation
- **[Storage Functions](./storage.md)** - Data persistence and localStorage utilities

## Quick Reference

### Core Classes

| Class | File | Purpose |
|-------|------|---------|
| `GameLogic` | gameLogic.js | Manages game state, rules, and win conditions |
| `UI` | ui.js | Handles DOM manipulation and user interactions |
| `Storage` | storage.js | Manages localStorage operations |

### Key Functions Overview

| Function | Class | Description |
|----------|-------|-------------|
| `makeMove()` | GameLogic | Process player moves and update game state |
| `checkWinner()` | GameLogic | Detect winning conditions |
| `createGameBoard()` | UI | Generate dynamic game grid |
| `updateDisplay()` | UI | Refresh UI elements |
| `saveScoresToLocalStorage()` | Storage | Persist game scores |

## Getting Started

1. Review the [App Functions](./app.md) documentation to understand the application flow
2. Explore [Game Logic Functions](./gameLogic.md) for core game mechanics
3. Check [UI Functions](./ui.md) for interface management
4. See [Storage Functions](./storage.md) for data persistence

## Documentation Conventions

- **Parameters**: Listed with type and description
- **Return Values**: Type and description of returned data
- **Examples**: Code examples showing function usage
- **Notes**: Additional implementation details or considerations
