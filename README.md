# 📚 Book Management System
This is a RESTful API built with Node.js and Express.js for managing a collection of books. It includes features for efficient listing of large datasets using pagination, user authentication with JWT, and data validation, all orchestrated with Docker Compose for easy setup.

## 🚀 Technologies Used
- Node.js: JavaScript runtime environment.
- Express.js: Web framework for Node.js, used to build the API.
- MySQL: Relational database for storing book and user data.
- Docker & Docker Compose: For containerization and orchestration of the development and production environment.
T- ypeScript: Superset of JavaScript that adds static typing.
- Bcrypt: For secure password hashing.
- JSON Web Tokens (JWT): For token-based authentication.
- Express-validator / Joi (optional): For input data validation.

## ⚙️ Environment Setup
### Prerequisites
Make sure you have the following installed on your machine:

- Node.js (version 18 or higher recommended)
- Docker Desktop (which includes Docker Engine and Docker Compose)
1. Clone the Repository
```
git clone https://github.com/your-username/your-book-management-project.git
cd your-book-management-project
```
2. Configure Environment Variables
Create a .env file in the project root (in the same folder as docker-compose.yml) with the following variables:
```
# Variables for the MySQL database
DB_HOST=db             # Service name of the database in Docker Compose
DB_USER=app_user       # User your application will use to connect
DB_PASSWORD=your_app_password # Password for the application user
DB_NAME=library_app    # Name of the database

# Variable for MySQL ROOT password (only for the MySQL container)
MYSQL_ROOT_PASSWORD=your_mysql_root_password_secure

# Secret for signing JSON Web Tokens (JWT)
JWT_SECRET=your_super_secret_jwt_secret_key # **Change this in production!**
```
3. Start the Application with Docker Compose
With Docker Desktop running, open your terminal in the project root and execute:
```
docker-compose up -d --build
```
This command will:

- Build your application's Docker image (based on the Dockerfile).
- Download the MySQL image (if not already present).
- Create and start the app (your Node.js API) and db (MySQL database) containers.
  
4. Accessing the API
Once the containers are up and running, your API will be accessible at:
```
http://localhost:3000
```
You can test the API endpoints using tools like Postman, Insomnia, or curl.

🛑 Stopping the Application
To stop and remove the containers, networks, and volumes created by Docker Compose:

```
docker-compose down -v
```
## 👤 Author

Mateus Gomes
[GitHub](https://github.com/mateusgomes6)
[Email](mateusgomesdc@hotmail.com)
