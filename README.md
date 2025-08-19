# Smart Device Management Backend

## Project Overview

This backend service enables users to register, authenticate, and manage their smart devices. It supports device monitoring, logging, and usage analytics.

---

## Features

- User authentication and authorization using JWT
- CRUD operations for devices
- Device heartbeat tracking
- Logging device events and usage aggregation
- Input validation and secure password hashing
- Rate limiting and background jobs (optional)
- Dockerized environment setup (optional)

---

## Technology Stack

- Node.js (Express)
- MongoDB
- JWT for security
- Joi/Zod for validation
- Docker (optional)

---

## Prerequisites

- Node.js v18+
- MongoDB running locally or on a cloud service
- npm package manager
- (Optional) Docker and Docker Compose

---

## Installation & Setup

1. Clone the repository:

    ```
    git clone <your-repo-url>
    cd smart-device-backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env` file with:

    ```
    MONGO_URI=mongodb://localhost:27017/smart_device_backend
    JWT_SECRET=your_jwt_secret_here
    PORT=3000
    ```

4. Run the app:

    ```
    npm start
    ```

---

## Usage

- Import the provided Postman collection.
- Sign up a new user (`POST /auth/signup`).
- Log in to obtain a JWT token (`POST /auth/login`).
- Use the token to access protected device and analytics endpoints.

---

## API Overview

### User Management

- `POST /auth/signup`
- `POST /auth/login`

### Device Management

- `POST /devices`
- `GET /devices`
- `PATCH /devices/:id`
- `DELETE /devices/:id`
- `POST /devices/:id/heartbeat`

### Data & Analytics

- `POST /devices/:id/logs`
- `GET /devices/:id/logs?limit=10`
- `GET /devices/:id/usage?range=24h`

---

## Testing

- Manual testing recommended via Postman.
- Automated tests (if implemented) can be run via:

    ```
    npm test
    ```

---

## Docker Usage (Optional)

- Start with:

    ```
    docker-compose up --build
    ```

---

## Contribution

Contributions welcome! Please submit issues and pull requests.

---

## License

MIT License

---

## Contact

Your Name – your.email@example.com  
Repository: <your-repo-url>
