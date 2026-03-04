# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a sample contact form application demonstrating a React TypeScript frontend with a Flask Python backend. The project is primarily used as a walkthrough/demo for the Windsurf Editor, but contains functional application code in `contact-form-app/`.

## Project Structure

### Frontend
```
contact-form-app/frontend/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── index.tsx        # Entry point
├── package.json
└── tsconfig.json
```

### Backend
```
contact-form-app/backend/
├── app/
│   ├── __init__.py          # Flask app factory (create_app)
│   ├── config.py            # Configuration (Dev/Testing/Prod)
│   ├── models/
│   │   └── __init__.py      # Contact model
│   ├── routes/
│   │   ├── __init__.py
│   │   └── contacts.py       # Contact API routes
│   └── utils/
│       ├── __init__.py
│       ├── validators.py     # Validation functions
│       └── helpers.py        # File handling helpers
├── tests/
│   ├── __init__.py
│   └── test_contacts.py     # Unit tests
├── run.py                   # Entry point
├── requirements.txt
└── uploads/                 # File uploads directory
```

## Common Commands

### Frontend (React + TypeScript)
```bash
cd contact-form-app/frontend
npm install          # Install dependencies
npm start            # Start dev server on localhost:3000
npm test             # Run tests (Jest)
npm run build        # Production build
npm run lint         # Lint with ESLint
```

### Backend (Flask + Python)
```bash
cd contact-form-app/backend
python3 -m venv venv
source venv/bin/activate  # On Unix/macOS
pip install -r requirements.txt
python run.py              # Start server on localhost:5000
```

### Running Specific Tests
- Frontend: `npm test -- --watchAll=false` to run once
- Backend: `pytest tests/ -v` (after activating venv)

## Architecture

The application follows a simple client-server architecture:
- **Frontend**: React 19 with TypeScript, uses functional components, communicates with backend via REST API
- **Backend**: Flask with in-memory storage (no database), provides `/api/contacts` endpoints for GET/POST

Key endpoints:
- `POST /api/contacts` - Submit a contact form
- `GET /api/contacts` - Retrieve all contacts

## Important Development Guidelines

- **Language preference**: The project is migrating to TypeScript-only. When proposing new files, prefer TypeScript over Python
- **React patterns**: Use functional components with hooks, avoid class-based components
- **Indentation**: Use 2 spaces for indentation in frontend code
- **Security**: Use parameterized queries when interfacing with databases; validate and sanitize all user inputs
- **Serverless consideration**: When receiving requests that are antipatterns for serverless architecture, clarify with user before proceeding
