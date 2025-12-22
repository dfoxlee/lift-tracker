# LiftTracker

A comprehensive web-based fitness tracking application for logging workouts, tracking exercises, and monitoring your strength training progress over time.

## Overview

LiftTracker is a full-stack application that helps users create workout routines, log completed workouts, and visualize their fitness progress through charts and historical data. The application features a clean, responsive interface with real-time data synchronization and user authentication.

## Features

-  User Authentication: Secure JWT-based authentication with email confirmation
-  Workout Management: Create, edit, view, and delete custom workout routines
-  Exercise Tracking: Log exercises with sets, reps, and weights
-  Progress Visualization: Track exercise history with interactive charts
-  Workout Composition: Flexible workout builder with exercise overview and detail views
-  Real-time Updates: Live workout timer and progress tracking
-  Responsive Design: Mobile-friendly interface that works across all devices
-  Weight Unit Preferences: Support for pounds (lb) and kilograms (kg)

## Tech Stack

### Frontend

-  Framework: React 19.2.0 with TypeScript
-  Build Tool: Vite
-  State Management: Zustand
-  Routing: React Router DOM
-  Charts: Chart.js with react-chartjs-2
-  UI Components: React Icons
-  Notifications: React Toastify
-  Styling: CSS Modules

### Backend

-  Runtime: Node.js
-  Framework: Express.js
-  Database: MySQL
-  Authentication: JWT (jsonwebtoken)
-  Password Hashing: bcrypt
-  Email Service: Nodemailer
-  Logging: Winston, Morgan
-  Rate Limiting: express-rate-limit

## Prerequisites

-  Node.js (v14 or higher)
-  MySQL (v8 or higher)
-  Docker and Docker Compose (optional, for database)
-  npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone github.com/dfoxlee/lift-tracker.git
cd lift-tracker
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. Set up environemnt variables

- Backend

```
PORT=8008
ENVIRONMENT=DEVELOPMENT
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_api_password
FRONTEND_URL-http://localhost:5173
```

- Frontend

```
VITE_ENVIRONMENT=LOCAL
VITE_LOCAL_URL=http://localhost:8008/api/v1
VITE_PRODUCTION_URL=/api/v1
```

5. Set up the database

```bash
cd backend/db
docker volume create lift-tracker-volume
docker-compose up -d
```

6. Initialize the database schema

```bash
mysql -h localhost -P 3307 -u root -p lift_tracker < db-initialization.sql
```

## Running the Application

### Development Mode

Start the backend server:

```bash
cd backend
npm run dev
```

The API will be available at http://localhost:8008

Start the frontend development server:

```bash
cd frontend
npm run dev
```

The application will be available at http://localhost:5173

## Production Mode

Build the frontend:

```bash
cd frontend
npm run build
```

Start the backend server:

```bash
cd ../backend
npm start
```

The backend will serve the built frontend files in production mode.

### Using Docker

Build and run the application with Docker:

```bash
docker build -t lift-tracker .
docker run -p 4004:4004 --env-file backend/.env lift-tracker
```

## Project Structure
```
lift-tracker/
├── backend/ # Backend API
│ ├── controllers/ # Request handlers
│ ├── db/ # Database configuration
│ │ ├── db-config.js
│ │ ├── db-initialization.sql
│ │ └── docker-compose.yaml
│ ├── middleware/ # Custom middleware
│ │ ├── auth-middleware.js
│ │ ├── error-middleware.js
│ │ ├── logging-middleware.js
│ │ └── rate-limit-middleware.js
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── utils/ # Helper functions
│ ├── .env
│ ├── index.js
│ ├── package.json
│ └── README.md
├── frontend/ # Frontend application
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── constants/ # Application constants
│ │ ├── hooks/ # Custom React hooks
│ │ ├── pages/ # Page components
│ │ │ ├── completed-workout-composition/
│ │ │ ├── home/
│ │ │ ├── landing/
│ │ │ ├── shared/ # Shared components
│ │ │ └── workout-composition/
│ │ ├── services/ # API services
│ │ ├── stores/ # Zustand state stores
│ │ ├── types/ # TypeScript types
│ │ ├── utils/ # Helper functions
│ │ ├── App.tsx
│ │ ├── index.css
│ │ └── main.tsx
│ ├── .env
│ ├── index.html
│ ├── package.json
│ ├── tsconfig.json
│ ├── vite.config.ts
│ └── README.md
├── Dockerfile
└── README.md
```
## API Endpoints

### Authentication

-  POST /api/v1/users/sign-up - Register a new user
-  POST /api/v1/users/login - Login and receive JWT token
-  GET /api/v1/users/confirm-email/:token - Confirm email address
-  POST /api/v1/users/logout - Logout user
-  POST /api/v1/users/update-password - Update user password
-  POST /api/v1/users/update-email - Update user email
-  DELETE /api/v1/users/delete-account - Delete user account

### Workouts (Protected)

-  GET /api/v1/workouts - Get all workouts for authenticated user
-  POST /api/v1/workouts - Create a new workout
-  GET /api/v1/workouts/:id - Get specific workout
-  PATCH /api/v1/workouts - Update workout
-  DELETE /api/v1/workouts/:id - Delete workout

### Completed Workouts (Protected)

-  GET /api/v1/completed-workouts - Get all completed workouts
-  GET /api/v1/completed-workouts/new/:workoutId - Get new completed workout from template
-  GET /api/v1/completed-workouts/:id - Get specific completed workout
-  POST /api/v1/completed-workouts - Create completed workout
-  PATCH /api/v1/completed-workouts - Update completed workout
-  DELETE /api/v1/completed-workouts/:id - Delete completed workout

### Completed Exercises (Protected)

-  GET /api/v1/completed-exercises/history - Get completed exercise history

## Key Features Explained

### Workout Composition

The WorkoutComposition page allows users to create and edit workout templates. Users can toggle between detail view (for editing individual exercises and sets) and overview mode (for seeing all exercises at once).

### Completed Workout Tracking

The CompletedWorkoutComposition page provides a workout timer and allows users to log their actual performance, including marking sets as completed and adding notes.

### Progress Visualization

The CompletedExerciseChart component displays historical exercise data using Chart.js, helping users track their progress over time.

## Authentication Flow

1. User signs up via the landing page
2. Confirmation email is sent using Nodemailer
3. User clicks email link to confirm account
4. User logs in and receives JWT token
5. Token is stored in localStorage and used for authenticated requests
6. Protected routes require valid JWT token in Authorization header

## Database Schema

The application uses MySQL with the following main tables:

-  user - User accounts and preferences
-  workout - Workout templates
-  exercise - Exercises within workouts
-  exercise_set - Sets within exercises
-  completed_workout - Logged workout sessions
-  completed_exercise - Individual completed exercises
-  completed_exercise_set - Individual completed sets
-  ref_code - Reference data (weight units, etc.)
   See db-initialization.sql for complete schema.

## Deployment

The application is configured for deployment using Docker. The Dockerfile builds both frontend and backend for production deployment.

## Contributing

Fork the repository
Create a feature branch (git checkout -b feature/your-feature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/your-feature)
Open a Pull Request

## License

UNLICENSED

## Contact

For questions or support, please contact lifttrackerinfo@gmail.com

## Acknowledgments

Built with React and Express.js
Database powered by MySQL
Charts powered by Chart.js
Icons from React Icons
