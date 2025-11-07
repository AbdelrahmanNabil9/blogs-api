# Blog Management API

This is a Node.js API for a simple blog management system.

## Features

- User Authentication (Signup, Login with JWT)
- Full CRUD operations for Blogs
- Blog ownership (users can only edit/delete their own)
- Filtering blogs by category
- Searching blogs by title or content
- Pagination for blog lists

## Prerequisites

- Node.js (v18+)
- MongoDB (or a MongoDB Atlas connection string)

## Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd blog-api
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root. Copy the contents of `.env.example` (if you made one) or use this template:
    ```.env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/blogDB
    JWT_SECRET=your_very_strong_secret_key
    ```

## Running the Application

- **Development (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm start
  ```
- **Running Tests:**
  ```bash
  npm test
  ```

## API Endpoints

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Blogs (Protected routes require `Bearer <token>`)

- `GET /api/blogs` (Public)
  - Query Params: `?category=Technology`, `?search=node`, `?page=1`, `?limit=5`
- `POST /api/blogs` (Protected)
- `PUT /api/blogs/:id` (Protected, Owner only)
- `DELETE /api/blogs/:id` (Protected, Owner only)
