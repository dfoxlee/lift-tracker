# Frontend Application for Lift Tracker

## Overview

This is the frontend application for the Lift Tracker project, a web-based platform for tracking workout progress, exercises, and fitness goals.

## Features

- User authentication and profile management
- Exercise library and workout logging
- Progress tracking and visualization
- Responsive design for mobile and desktop
- Real-time data synchronization

## Tech Stack

- **Framework**: React 
- **State Management**: Zustand
- **Styling**: CSS Modules
- **Build Tool**: Vite
- **API Communication**: Fetch API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone github.com/dfoxlee/lift-tracker.git
   cd lift-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add required environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:4004/api
   REACT_APP_ENV=development
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or your configured port).

### Production Build

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── store/       # State management
│   ├── utils/       # Helper functions
│   ├── styles/      # Global styles
│   ├── App.jsx      # Main application component
│   └── main.jsx     # Application entry point
├── .env             # Environment variables
├── package.json     # Project dependencies
└── README.md        # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter
- `npm run test` - Run tests

## Testing

```bash
npm run test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

UNLICENSED

## Contact

For questions or support, please contact lifttrackerinfo@gmail.com

