# LeetLab: A LeetCode Clone

This repository contains the source code for LeetLab, a project aimed at cloning the core functionalities of LeetCode. It's a full-stack application with a separate backend and frontend.

## Project Status

🚧 **Under Development** 🚧

This project is currently in the initial stages of development. The primary focus right now is on building a robust and secure authentication system for the backend. The frontend is planned and will be developed in the future.

## Project Structure

-   `/server`: Contains the backend code (Hono.js, Node.js, PostgreSQL, Prisma).
-   `/client`: Will contain the frontend code (React, Next.js, or similar).

---

## Backend (Server)

The backend is built with Hono.js and provides a RESTful API for the LeetLab application.

### Features

#### Implemented

-   User registration (`/api/v1/auth/register`)
-   User login with JWT authentication (`/api/v1/auth/login`)
-   User logout (`/api/v1/auth/logout`)
-   Protected route to check user status (`/api/v1/auth/check`)
-   Password hashing using Bun's built-in tools.
-   Cookie-based session management.
-   Authentication middleware to protect routes.

#### Planned Features

-   Password reset functionality.
-   User profile management.
-   Problem submission and evaluation.
-   Real-time judging of submissions.
-   Discussion forums.
-   And much more!

### Tech Stack

-   **Framework:** [Hono.js](https://hono.dev/) - A fast, lightweight, and flexible web framework for the edge.
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript.
-   **Runtime:** [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime.
-   **Language:** [TypeScript](https://www.typescriptlang.org/)

### Middleware

#### Authentication (`auth.middleware.ts`)

-   This middleware protects designated routes by verifying a JWT token sent in an HTTP-only cookie (`jwt`).
-   If the token is valid, it fetches the corresponding user's data from the database and attaches it to the request context for use in subsequent controllers.
-   If the token is missing or invalid, it returns a `401 Unauthorized` response, preventing access to the protected endpoint.

### Getting Started

#### Prerequisites

-   [Bun](https://bun.sh/docs/installation)
-   [Node.js](https://nodejs.org/en/download/) (for `npm` or `yarn` if you prefer)
-   [PostgreSQL](https://www.postgresql.org/download/)

#### Installation & Setup

1.  **Navigate to the server directory:**

    ```bash
    cd server
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following variables. You can use the `sample.env` as a template.

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="your-secret-key"
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

### API Endpoints

#### Authentication

-   **`POST /api/v1/auth/register`**

    Registers a new user.

    **Request Body:**

    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }
    ```

-   **`POST /api/v1/auth/login`**

    Logs in an existing user and returns a JWT in an HTTP-only cookie.

    **Request Body:**

    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```

-   **`POST /api/v1/auth/logout`**

    Logs out the currently authenticated user by clearing the session cookie.

    **Requires Authentication:** Yes

-   **`GET /api/v1/auth/check`**

    Checks the authentication status of the current user. If the user is authenticated (i.e., has a valid `jwt` cookie), it returns the user's information.

    **Requires Authentication:** Yes

---

## Frontend (Client)

The frontend for LeetLab is planned but not yet implemented. It will be a modern, responsive web application that consumes the backend API.

### Planned Tech Stack

-   **Framework:** React or Next.js
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS or similar

More details will be added here as the frontend development progresses.