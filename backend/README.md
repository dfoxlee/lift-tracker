# Backend API for Lift Tracker

## Overview

This is the backend REST API for the Lift Tracker project, a web-based platform for tracking workout progress, exercises, and fitness goals. Built with Express.js and MySQL, it provides secure authentication, workout management, and progress tracking capabilities.

## Features

- **User Authentication**: JWT-based authentication with email confirmation
- **Workout Management**: Create, read, update, and delete workout routines
- **Exercise Tracking**: Log completed exercises and workouts
- **Email Notifications**: Automated email confirmations using Nodemailer
- **Rate Limiting**: API protection against abuse
- **Logging**: Comprehensive logging with Winston
- **Error Handling**: Centralized error handling middleware
- **CORS Support**: Cross-origin resource sharing for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **Logging**: Winston, Morgan
- **Environment Variables**: dotenv
- **Rate Limiting**: express-rate-limit

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- Docker and Docker Compose (optional, for database)
- npm or yarn package manager

## Installation

1. Navigate to the backend directory:
   ```bash
   cd lift-tracker/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```env
   # Server Configuration
   PORT=4004
   ENVIRONMENT=DEVELOPMENT

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3307
   DB_USER=root
   DB_PASSWORD=admin-1234
   DB_NAME=lift_tracker

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password

   # Frontend URL
   FRONTEND_URL=http://localhost:5173
   ```

4. Set up the database using Docker Compose:
   ```bash
   cd db
   docker volume create lift-tracker-volume
   docker-compose up -d
   ```

5. Initialize the database schema:
   ```bash
   # Connect to MySQL and run the initialization script
   mysql -h localhost -P 3307 -u root -p lift_tracker < db/db-initialization.sql
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:4004` (or your configured port) with nodemon for auto-reloading.

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login and receive JWT token
- `GET /api/v1/users/confirm-email/:token` - Confirm email address

### Workouts (Protected)

- `GET /api/v1/workouts` - Get all workouts for authenticated user
- `POST /api/v1/workouts` - Create a new workout
- `GET /api/v1/workouts/:id` - Get specific workout
- `PUT /api/v1/workouts/:id` - Update workout
- `DELETE /api/v1/workouts/:id` - Delete workout

### Completed Workouts (Protected)

- `GET /api/v1/completed-workouts` - Get all completed workouts
- `POST /api/v1/completed-workouts` - Log a completed workout
- `GET /api/v1/completed-workouts/:id` - Get specific completed workout
- `DELETE /api/v1/completed-workouts/:id` - Delete completed workout

### Completed Exercises (Protected)

- `GET /api/v1/completed-exercises` - Get all completed exercises
- `POST /api/v1/completed-exercises` - Log a completed exercise
- `GET /api/v1/completed-exercises/:id` - Get specific completed exercise
- `PUT /api/v1/completed-exercises/:id` - Update completed exercise
- `DELETE /api/v1/completed-exercises/:id` - Delete completed exercise

### Test Endpoints

- `GET /test` - API health check
- `GET /error` - Test error handling middleware

## Project Structure

```
backend/
├── controllers/          # Request handlers
│   ├── completed-exercises.controller.js
│   ├── completed-workouts.controllers.js
│   ├── users.controllers.js
│   └── workouts.controllers.js
├── db/                   # Database configuration
│   ├── db-config.js
│   ├── db-initialization.sql
│   └── docker-compose.yaml
├── middleware/           # Custom middleware
│   ├── auth-middleware.js
│   ├── error-middleware.js
│   ├── logging-middleware.js
│   └── rate-limit-middleware.js
├── routes/               # API routes
├── services/             # Business logic
├── utils/                # Helper functions
│   └── email.utils.js
├── .env                  # Environment variables
├── index.js              # Application entry point
├── package.json          # Project dependencies
└── README.md             # This file
```

## Authentication

Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Setup

The database uses MySQL and is configured via Docker Compose. The schema includes tables for:

- `users` - User accounts and authentication
- `workouts` - Workout routines
- `completed_workouts` - Logged workout sessions
- `completed_exercises` - Individual exercise logs

## Logging

The application uses Winston for structured logging with the following levels:

- `error` - Error messages
- `warn` - Warning messages
- `info` - General information (default)
- `debug` - Debug information

Morgan middleware logs HTTP requests in development mode.

## Error Handling

Centralized error handling middleware catches and formats all errors consistently:

- Validation errors
- Authentication errors
- Database errors
- General application errors

## Rate Limiting

API endpoints are protected by rate limiting to prevent abuse. Default limits are configured in [`middleware/rate-limit-middleware.js`](middleware/rate-limit-middleware.js).

## Deployment

### Using Docker

Build and run the application with Docker:

```bash
# From the project root
docker build -t lift-tracker .
docker run -p 4004:4004 --env-file backend/.env lift-tracker
```

The Dockerfile is located at the project root and serves both frontend and backend in production.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | Yes |
| ENVIRONMENT | Development/Production mode | Yes |
| DB_HOST | MySQL host | Yes |
| DB_PORT | MySQL port | Yes |
| DB_USER | Database user | Yes |
| DB_PASSWORD | Database password | Yes |
| DB_NAME | Database name | Yes |
| JWT_SECRET | Secret key for JWT | Yes |
| JWT_EXPIRES_IN | Token expiration time | Yes |
| EMAIL_USER | Gmail address for sending emails | Yes |
| EMAIL_PASSWORD | Gmail app password | Yes |
| FRONTEND_URL | Frontend application URL | Yes |

## Testing

```bash
# Test API health
curl http://localhost:4004/test

# Test error handling
curl http://localhost:4004/error
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

## Related Projects

- [Frontend Application](../frontend/README.md)