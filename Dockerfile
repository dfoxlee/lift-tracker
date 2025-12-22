FROM node:latest

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy and build frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# Copy backend source
COPY backend ./backend

WORKDIR /app/backend
EXPOSE 4004
CMD ["node", "index.js"]