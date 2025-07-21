# LeetLab: A LeetCode Clone (Backend)

This repository contains the backend for LeetLab, a project aimed at cloning the core functionalities of LeetCode. It's a work in progress, designed to showcase backend development skills.

## Project Status

🚧 **Under Development** 🚧

This project is currently in the initial stages of development. The primary focus right now is on building a robust and secure authentication system.

## Features

### Implemented

- User registration (`/api/v1/auth/register`)
- User login with JWT authentication (`/api/v1/auth/login`)
- Password hashing using Bun's built-in tools.
- Cookie-based session management.

### Planned Features

- Password reset functionality.
- User profile management.
- Problem submission and evaluation.
- Real-time judging of submissions.
- Discussion forums.
- And much more!

## Tech Stack

- **Framework:** [Hono.js](https://hono.dev/) - A fast, lightweight, and flexible web framework for the edge.
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript.
- **Runtime:** [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime.
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
- [Node.js](https://nodejs.org/en/download/) (for `npm` or `yarn` if you prefer)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/leetlab-backend.git
    cd leetlab-backend
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables. You can use the `sample.env` as a template.

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

## API Endpoints

### Authentication

- **`POST /api/v1/auth/register`**

  Registers a new user.

  **Request Body:**

  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

- **`POST /api/v1/auth/login`**

  Logs in an existing user and returns a JWT in an HTTP-only cookie.

  **Request Body:**

  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

- **`POST /api/v1/auth/logout`**

  (Not yet implemented) Logs out the user and clears the session cookie.

- **`GET /api/v1/auth/check`**

  A simple endpoint to check if the server is running.
