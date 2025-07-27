# LeetLab

LeetLab is a platform for practicing coding problems, inspired by LeetCode. This project is designed to help users improve their coding skills by solving problems and getting instant feedback.

## Project Overview

This repository contains the source code for the LeetLab application, which is divided into two main parts:

- **`client/`**: This directory will contain the frontend application, which will be built using a modern JavaScript framework like React. (Currently under development)
- **`server/`**: This directory contains the backend API, which is built with Hono and TypeScript.

## Backend (Server)

The backend is a Hono-based server that provides a RESTful API for the LeetLab application.

### Features

- **User Authentication**: JWT-based authentication with secure cookies.
  - User registration and login.
  - Role-based access control (USER and ADMIN roles).
- **Problem Management**:
  - CRUD operations for coding problems (Create, Read, Update, Delete).
  - Problems include a title, description, difficulty, tags, and test cases.
- **Code Submission and Execution**:
  - Integration with the Judge0 API to run user-submitted code against test cases.
  - Support for multiple programming languages (Python, Java, JavaScript).

### Tech Stack

- **Framework**: [Hono](https://hono.dev/)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (`hono/jwt`)
- **Code Execution**: [Judge0](https://judge0.com/)

### API Endpoints

All endpoints are prefixed with `/api/v1`.

#### Authentication (`/auth`)

- `POST /register`: Register a new user.
- `POST /login`: Log in an existing user.
- `POST /logout`: Log out the current user.
- `GET /check`: Check the authentication status of the current user.

#### Problems (`/problems`)

- `POST /create-problem`: Create a new coding problem (Admin only).
- `GET /get-all-problems`: Get a list of all coding problems.
- `GET /get-problem/:id`: Get a single coding problem by its ID.
- `PUT /update-problem/:id`: Update a coding problem by its ID (Admin only).
- `DELETE /delete-problem/:id`: Delete a coding problem by its ID (Admin only).
- `GET /get-solved-problems`: Get a list of problems solved by the current user.

### Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/leetlab.git
    cd leetlab/server
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory and add the following variables:

    ```
    DATABASE_URL="your-database-url"
    JWT_SECRET="your-jwt-secret"
    JUDGE0_API_URL="your-judge0-api-url"
    ```

4.  **Run database migrations:**

    ```bash
    bunx prisma migrate dev
    ```

5.  **Start the development server:**
    ```bash
    bun run dev
    ```
    The server will be running at `http://localhost:3000`.

## Frontend (Client)

The frontend for LeetLab is currently under development. It will be a single-page application (SPA) built with a modern JavaScript framework.
