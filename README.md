# Inventory Management System

## Description
This is a robust and efficient Inventory Management System built using Node.js, Express, MongoDB, and various other technologies to manage suppliers, inventory products, and import products from CSV files. The system allows admins to import, search, and manage inventory products efficiently, while ensuring data integrity and security.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture and Structure Diagrams](#architecture-and-structure-diagrams)
- [License](#license)

## Features
- **Supplier Management:** Add, search, and manage suppliers.
- **Inventory Management:** Add, view, and update inventory products.
- **Import Products from CSV:** Efficiently import multiple products at once through CSV files.
- **Search Functionality:** Search suppliers and inventory items based on names, phone numbers, emails, and descriptions.
- **Data Validation:** Ensure that all imported data is valid and consistent (e.g., check if the supplier exists before importing products).
- **File Uploads:** Use Multer for secure file handling (for product imports).
- **Authentication:** Use JWT (JSON Web Tokens) for secure user authentication.
- **Security Features:** Helmet for security headers and Bcrypt for password hashing.

## Technologies Used
- **Node.js:** Backend runtime environment for building scalable web applications.
- **Express.js:** Web framework for Node.js to create server-side APIs and manage routes.
- **MongoDB:** NoSQL database to store suppliers and inventory products.
- **Mongoose:** ODM (Object Document Mapping) for MongoDB to model the data and interact with the database.
- **JWT (JSON Web Token):** For securing APIs and handling authentication.
- **Bcrypt:** For securely hashing passwords during user authentication.
- **Multer:** Middleware for handling file uploads.
- **Fast-Csv:** For parsing CSV files to import products into the database.
- **Body-Parser:** To parse incoming request bodies in JSON format.
- **Cors:** To enable cross-origin resource sharing (CORS) for API requests.
- **Dotenv:** To manage environment variables securely.
- **Helmet:** For securing HTTP headers to protect the app.
- **Nodemailer:** To send email notifications (e.g., for product import success).
- **Morgan:** For logging HTTP requests to help with debugging.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/inventory-management-system.git
    ```

2. Install dependencies:
    ```bash
    cd inventory-management-system
    npm install
    ```

3. Create a `.env` file in the root of the project and add necessary configurations (like `MONGO_URI`, `JWT_SECRET`, etc.).

4. Run the application:
    ```bash
    npm start
    ```
    The server will run at `http://localhost:5000`.

## Usage
- `POST /api/inventory/import`: Upload a CSV file to import multiple products at once.
- `GET /api/suppliers`: Get a list of all suppliers.
- `GET /api/inventory`: Get a list of all inventory items.
- `POST /api/suppliers/search`: Search suppliers based on a query.
- `GET /api/inventory/low-stock`: Get a list of low stock inventory items.

## Architecture and Structure Diagrams

### 1. System Architecture Diagram
The system follows a client-server architecture with a MongoDB database as the backend. Here's a high-level overview of the architecture:

```plaintext
+-------------------+
|    Client App     |
| (User Interface)  |
+-------------------+
         |
         | HTTP Requests
         |
+-------------------+     MongoDB
|   Express Server  |  <------------->  +------------------+
|   (Node.js)       |                   |   MongoDB        |
+-------------------+                   +------------------+
         |
         | File Handling (Multer)
         |
+-------------------+
|  Multer Middleware|
+-------------------+

```

## API Endpoints

### Create Supplier

- **API Method:** `POST` 
- **URL:** `localhost:5000/api/suppliers/create`
- **Headers:**
    - `Content-type: application/json`
    - `Authorization: Bearer <Token>`

- **Body:**
    ```json
    {
        "name": "Eco Electronics",
        "contactInfo": {
            "phone": "7778889990",
            "email": "ecoelec@example.com"
        },
        "address": "321 Green Valley, Eco Town, Germany"
    }
    ```

- **Response:**
    ```json
    {
        "message": "Supplier created successfully",
        "data": {
            "name": "Eco Electronics",
            "contactInfo": {
                "phone": "7778889990",
                "email": "ecoelec@example.com"
            },
            "address": "321 Green Valley, Eco Town, Germany",
            "_id": "674eaa460d442eb8310b6f21",
            "createdAt": "2024-12-03T06:50:46.974Z",
            "updatedAt": "2024-12-03T06:50:46.974Z",
            "__v": 0
        }
    }
    ```

### Get All Suppliers

- **API Method:** `GET` 
- **URL:** `localhost:5000/api/suppliers/all`
- **Headers:**
    - `Content-type: application/json`
    - `Authorization: Bearer <Token>`

- **Response:**
    ```json
    {
        "data": [
            {
                "contactInfo": {
                    "phone": "1234567890",
                    "email": "supplier@example.com"
                },
                "_id": "674ea9ef0d442eb8310b6f0d",
                "name": "Supplier Name",
                "address": "123 Supplier Lane, City, Country",
                "createdAt": "2024-12-03T06:49:19.584Z",
                "updatedAt": "2024-12-03T06:49:19.584Z",
                "__v": 0
            },
            {
                "contactInfo": {
                    "phone": "9876543210",
                    "email": "techsupplies@example.com"
                },
                "_id": "674eaa1a0d442eb8310b6f11",
                "name": "Tech Supplies Co.",
                "address": "458 Tech Streets, Silicon Valley, USA",
                "createdAt": "2024-12-03T06:50:02.483Z",
                "updatedAt": "2024-12-03T06:55:53.830Z",
                "__v": 0
            }
        ]
    }
    ```

### Get Supplier by ID

- **API Method:** `GET` 
- **URL:** `localhost:5000/api/suppliers/by-id/674eaa1a0d442eb8310b6f11`
- **Headers:**
    - `Content-type: application/json`
    - `Authorization: Bearer <Token>`

- **Response:**
    ```json
    {
        "data": {
            "contactInfo": {
                "phone": "9876543210",
                "email": "techsupplies@example.com"
            },
            "_id": "674eaa1a0d442eb8310b6f11",
            "name": "Tech Supplies Co.",
            "address": "457 Tech Streets, Silicon Valley, USA",
            "createdAt": "2024-12-03T06:50:02.483Z",
            "updatedAt": "2024-12-03T06:55:21.291Z",
            "__v": 0
        }
    }
    ```

### Update Supplier by ID

- **API Method:** `PUT` 
- **URL:** `localhost:5000/api/suppliers/update/674eaa1a0d442eb8310b6f11`
- **Headers:**
    - `Content-type: application/json`
    - `Authorization: Bearer <Token>`

- **Body:**
    ```json
    {
        "address": "458 Tech Streets, Silicon Valley, USA"
    }
    ```

- **Response:**
    ```json
    {
        "message": "Supplier updated successfully",
        "data": {
            "contactInfo": {
                "phone": "9876543210",
                "email": "techsupplies@example.com"
            },
            "_id": "674eaa1a0d442eb8310b6f11",
            "name": "Tech Supplies Co.",
            "address": "458 Tech Streets, Silicon Valley, USA",
            "createdAt": "2024-12-03T06:50:02.483Z",
            "updatedAt": "2024-12-03T06:55:53.830Z",
            "__v": 0
        }
    }
    ```

### Delete Supplier by ID

- **API Method:** `DELETE` 
- **URL:** `localhost:5000/api/suppliers/delete/674eaa250d442eb8310b6f15`
- **Headers:**
    - `Content-type: application/json`
    - `Authorization: Bearer <Token>`

- **Response:**
    ```json
    {
        "message": "Supplier deleted successfully",
        "data": {
            "contactInfo": {
                "phone": "9998887776",
                "email": "greenagro@example.com"
            },
            "_id": "674eaa250d442eb8310b6f15",
            "name": "Green Agro Ltd.",
            "address": "78 Farm Road, Rural Town, Australia",
            "createdAt": "2024-12-03T06:50:13.327Z",
            "updatedAt": "2024-12-03T06:50:13.327Z",
            "__v": 0
        }
    }
    ```

### Supplier Search

- **API Method:** `GET` 
- **URL:** `localhost:5000/api/suppliers/search?query=tech`
- **Headers:**
    - `Content-type: application/json`
    - `Authorization: Bearer <Token>`

- **Response:**
    ```json
    {
        "data": [
            {
                "contactInfo": {
                    "phone": "9876543210",
                    "email": "techsupplies@example.com"
                },
                "_id": "674eaa1a0d442eb8310b6f11",
                "name": "Tech Supplies Co.",
                "address": "458 Tech Streets, Silicon Valley, USA",
                "createdAt": "2024-12-03T06:50:02.483Z",
                "updatedAt": "2024-12-03T06:55:53.830Z",
                "__v": 0
            },
            {
                "contactInfo": {
                    "phone": "5554443332",
                    "email": "buildtech@example.com"
                },
                "_id": "674eaa3a0d442eb8310b6f1d",
                "name": "BuildTech Industries",
                "address": "99 Construction Lane, Metro City, USA",
                "createdAt": "2024-12-03T06:50:34.403Z",
                "updatedAt": "2024-12-03T06:50:34.403Z",
                "__v": 0
            }
        ]
    }
    ```
    

 

# Inventory Management API Documentation



## API Endpoints

**Inventory Routes**
Base URL: `/api/inventory`

| Endpoint     | Method | Role           | Description                        |
|--------------|--------|----------------|------------------------------------|
| /create      | POST   | Admin          | Create a new stock entry           |
| /update/:id  | PUT    | Admin          | Update an existing stock entry     |
| /delete/:id  | DELETE | Admin          | Delete a product by ID             |
| /product/:id | GET    | Admin          | Fetch product details by ID        |
| /all         | GET    | Admin, Manager | Fetch all inventory products       |
| /low-stock   | GET    | Admin, Manager | Fetch low-stock products           |
| /import      | POST   | Admin          | Import products from CSV           |





### Headers
- `Content-Type: application/json`
- `Authorization: Bearer Token`



###  1 Create Inventory

  - **Method**: ` POST`
  - **URL**: ` localhost:5000/api/inventory/create`
  -**Headers:**

* Content-Type: application/json
* Authorization: Bearer Token (Replace with your actual token)

**Body:**

The request body should contain a JSON object with the following properties:

```json
{
  "name": "cctv camera",
  "description": "bullet camera",
  "quantity": 600,
  "supplier": "674eaa1a0d442eb8310b6f11",
  "price": 2290.5
}

## Response:


{
  "message": "Stock entry created successfully",
  "data": {
    "name": "cctv camera",
    "description": "bullet camera",
    "quantity": 600,
    "lowStock": 10,
    "supplier": "674eaa1a0d442eb8310b6f11",
    "isLowStock": false,
    "_id": "674ec1b411474e2d1592fc94",
    "createdAt": "2024-12-03T08:30:44.192Z",
    "updatedAt": "2024-12-03T08:30:44.192Z",
    "__v": 0
  }
}
```

### 2. Update Inventory
   - **Method** :`PUT`
   - **URL**: `localhost:5000/api/inventory/update/:id `
   - **Headers**:
     `Content-Type`: `application/json`
     `Authorization`: `Bearer <token>`
   **Body** :
     ```json
     {
       "quantity": 250,
       "price": 3220.0
     }
     ```
     ***Respose**:
     ```json
     {
   
    "message": "Stock entry updated successfully",
    "data": {
        "_id": "674eadf918c40f427701467a",
        "name": "cctv camera",
        "description": "outdoor wifi camera",
        "quantity": 250,
        "lowStock": 10,
        "supplier": "674eaa1a0d442eb8310b6f11",
        "isLowStock": false,
        "createdAt": "2024-12-03T07:06:33.774Z",
        "updatedAt": "2024-12-03T07:18:58.235Z",
        "__v": 0
    }
}


     
     


 ### 3. Get Product by ID
   - **Meethod**: `GET`
   - **URL**: `localhost:5000/api/inventory/product/674eadf918c40f427701467a`
   -**Headers**:
     - `Content-Type`: `application/json`
     -`Authorization`: `Bearer <token>`

## Response
```json
{
    "data": {
        "_id": "674eadf918c40f427701467a",
        "name": "cctv camera",
        "description": "outdoor wifi camera",
        "quantity": 250,
        "lowStock": 10,
        "supplier": {
            "contactInfo": {
                "phone": "9876543210",
                "email": "techsupplies@example.com"
            },
            "_id": "674eaa1a0d442eb8310b6f11",
            "name": "Tech Supplies Co."
        },
        "isLowStock": false,
        "createdAt": "2024-12-03T07:06:33.774Z",
        "updatedAt": "2024-12-03T07:18:58.235Z",
        "__v": 0
    }
}
```


     

### 4. Delete Product by ID
  - **Method** : `DELETE`
  - **URL** :` localhost:5000/api/inventory/delete/674eae3918c40f4277014684`
  - **Headers**:
    -` Content-Type`: `application/json`
    - `Authorization`: `Bearer <token>`
## Response
```json
{
    "message": "Stock entry deleted successfully",
    "data": {
        "_id": "674eae3918c40f4277014684",
        "name": "cctv camera regular",
        "description": "doom camera",
        "quantity": 500,
        "lowStock": 10,
        "supplier": "674eaa1a0d442eb8310b6f11",
        "isLowStock": false,
        "createdAt": "2024-12-03T07:07:37.889Z",
        "updatedAt": "2024-12-03T07:07:37.889Z",
        "__v": 0
    }
}
```


### 5. Get All Products
   GET localhost:5000/api/inventory/all
   Headers:
     Content-Type: application/json
     Authorization: Bearer <token>

### 6. Get Low Stock Products
   GET localhost:5000/api/inventory/low-stock
   Headers:
     Content-Type: application/json
     Authorization: Bearer <token>

### 7. Import Bulk Products
   POST localhost:5000/api/inventory/import
   Headers:
     Authorization: Bearer <token>
   Body (form-data):
     - Key: file, Value: <file>









  

