# Cercle API

## Installation

### Requirements
- [Docker Compose](https://docs.docker.com/compose/install/)

### Configuring
Set up PostgreSQL credentials:
* Host: postgres-db (or localhost if used outside docker)
* Username: postgres
* Password: p0stgr3s

Relevant file: `src/config.js`

### Installing
1. Move to backend folder
```
cd cercle-backend/
```

2. Init the containers using Docker Compose

3. Get into the Node.js container
```
docker exec -it node-shell bash
```

4. Install npm packages

5. Run the seeder script
```
node bin/seeder.js up
```

## Running
1. Open a shell on the Node.js container
```
docker exec -it node-shell bash
```

2. Init the server
```
npm run dev
```

## API Documentation

### Patients
- **GET** `/patients`  
  Retrieves a list of all patients in the database.

- **POST** `/patient`  
  Creates a new patient.  
  **Required fields in JSON body:**  
  - `name` (string)  
  - `sex` (male/female)  
  - `birthdate` (YYYY-MM-DD)

- **GET** `/patients/:id/embryos`  
  Retrieves a list of embryos associated with a specific patient.  
  **Path Parameter:**  
  - `id` (integer) - The ID of the patient.

---

### Embryo Transfers
- **GET** `/embryo-transfers`  
  Retrieves a list of all embryo transfers in the database.


## Project structure
```
backend/
├── deploy/             # Deployment-related files (e.g., Docker Compose).
│   └── docker-compose.yml  # Configuration for Docker containers.

├── src/                
│   ├── app.js          # Entry point for the backend application.
│   ├── config.js       # Configuration settings for the application.

│   ├── api/            # API routes and controllers.
│   │   ├── index.js    # Main API router.
│   │   ├── _exceptions/ # Custom exception classes for error handling.
│   │   ├── _middleware/ # Middleware functions (e.g., error handling, CORS).
│   │   └── patients/   # API endpoints specific to "patients".

│   ├── models/         # Sequelize models for database entities.
│   │   ├── embryo.js   # Model for "Embryo" entity.
│   │   ├── patient.js  # Model for "Patient" entity.
│   │   └── relations.js # Defines relationships between models.

│   ├── services/       # Service modules for application logic.
│   │   ├── console.js  # Custom console logging functionality.
│   │   ├── express/    # Express.js server setup.
│   │   └── sequelize/  # Sequelize ORM setup.
```

## Useful links
- https://docs.docker.com/compose/install/ - Install Docker
- https://nodejs.org/en/download/ - Install node.js
- https://sequelize.org/docs/v6/ - Sequelize docs