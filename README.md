# Emerge – Communication Platform

Emerge is a prototype communication platform designed to facilitate anonymous chat between vulnerable children and trained professionals.

The system was developed as part of a university project focusing on digital support solutions and secure communication in sensitive contexts.

---

## Architecture Overview

The application is built as a real-time communication system with separation between frontend, backend services, and database.

Key architectural elements:

- Frontend: React-based user interface
- Backend: Back4App (Parse Server)
- Real-time updates via Live Queries
- Cloud functions 
- User authentication and role separation

Two user roles are implemented:

- Child (end user)
- Professional (support role)

---

## Features

- Real-time chat
- Anonymous user interaction
- Role-based access
- Cloud-hosted backend
- Persistent message storage

---

## Running the Application Locally

After cloning the repository:

```bash
cd Emerge-app
npm install
npm run dev
