# 2B-Egypt - E-Commerce Web Application

This is an E-Commerce platform named **2B-Egypt** built using **ASP.NET 8 MVC** for the Admin Dashboard, **ASP.NET 8 API** for backend services, and **Angular** for the frontend. The project allows users to browse products, add them to the cart, and complete transactions. Admins can manage products, orders, users, and other system settings.

## Features

- **Admin Dashboard** (ASP.NET 8 MVC)
  - User management (view and manage users)
  - Product management (add, edit, delete products)
  - Order management (view and process orders)
  - Analytics and Reports

- **User Interface** (Angular)
  - User authentication and registration
  - Product catalog with categories and search
  - Shopping cart and checkout system
  - Order history and user profile management

- **Backend API** (ASP.NET 8 API)
  - CRUD operations for products, orders, and users
  - User authentication (JWT-based)
  - Order processing and payment integration (if applicable)

## Installation

### Prerequisites

Make sure you have the following installed:

- [.NET SDK 8](https://dotnet.microsoft.com/download/dotnet) (for ASP.NET 8)
- [Node.js](https://nodejs.org/) (for Angular)
- [Angular CLI](https://angular.io/cli) (install with `npm install -g @angular/cli`)

### Setup Instructions

#### 1. Clone the repository
```bash
git clone https://github.com/AhmedMeky/2B-Egypt-Store.git
cd 2B-Egypt

#### 2.  Backend Setup (ASP.NET 8 API)
Navigate to the API project folder:
```bash
cd 2B-Egypt.API

##### Restore dependencies:
```bash
dotnet restore

##### Build the project::
```bash
dotnet build

##### run the API::
```bash
dotnet run


#### 3. Frontend Setup (Angular)
Navigate to the Angular project folder:
```bash
cd ../2B-Egypt.Angular

##### Install dependencies
```bash
npm install

##### Serve the Angular App
```bash
ng serve

###### The application should now be running on http://localhost:4200


#### 4.  Admin Dashboard Setup (ASP.NET 8 MVC)
Navigate to the Admin Dashboard project folder:
```bash
cd ../2B-Egypt.Admin

##### Restore dependencies:
```bash
dotnet restore

##### Build the project::
```bash
dotnet build

##### run the API::
```bash
dotnet run

##### The Admin Dashboard should now be running on http://localhost:5269.

### Configuration
#### Database: This project uses SQL Server. Make sure to set up the database connection string in appsettings.json in both the API and Admin Dashboard projects.

#### Example connection string:
```bash
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=2BEgyptDB;Trusted_Connection=True;"
}


more technologies please
ChatGPT said:
ChatGPT
Certainly! Here is an even more expanded version of the Technologies Used section with additional technologies and tools that can be relevant for a full-fledged e-commerce application:

markdown
Copy code
## Technologies Used

- **ASP.NET 8 MVC**: For building the Admin Dashboard using the Model-View-Controller architecture.
- **ASP.NET 8 API**: For creating the backend API with RESTful services.
- **Angular**: For building a dynamic and interactive frontend for users.
- **SQL Server**: For the database management system, storing products, orders, and user data.
- **JWT (JSON Web Tokens)**: For secure user authentication and token-based authorization.
- **Entity Framework Core**: ORM (Object-Relational Mapping) used for data access and interactions with SQL Server.
- **Bootstrap**: For responsive front-end design to ensure a mobile-friendly UI.
- **Swagger**: API documentation and testing tool that provides an interactive API documentation interface.
- **Nginx**: Reverse proxy server used to manage frontend and backend interactions (optional, depending on deployment setup).
- **Redis**: In-memory key-value store, often used for caching frequently accessed data for improved performance.
- **JWT Bearer Authentication**: Used in API for secure authentication and authorization.
- **OAuth 2.0**: For external authentication integrations (such as Google, Facebook login).
- **Unit Testing Frameworks (xUnit, NUnit, Jasmine, Karma)**: For writing unit tests to ensure the quality and reliability of the application.
- **SASS/SCSS**: CSS preprocessors for writing cleaner and more maintainable stylesheets.
- **Webpack**: A module bundler for JavaScript, used in the Angular app to bundle and optimize the frontend code.
- **Git**: Version control system used to track changes and collaborate on the codebase.
- **GitHub / GitLab / Bitbucket**: Git repositories hosting services for version control and collaboration.
- **Webpack**: JavaScript bundling and optimization tool used in Angular for better performance.