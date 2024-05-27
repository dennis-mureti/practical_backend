Sure, here's a simpler README file:

---

# Customer API

This is a Node.js API for managing customer information using Express.js and MongoDB. The API allows you to add new customers and retrieve a list of all customers.

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or a MongoDB Atlas account

## Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/yourusername/customer-api.git
   cd customer-api
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Configure MongoDB:**

   Ensure MongoDB is running locally or configure a MongoDB Atlas cluster. Update the MongoDB connection string in `server.js` if necessary.

4. **Start the Server:**

   ```sh
   node server.js
   ```

   The server will start on port 5000 by default.

## API Endpoints

### Add a New Customer

- **URL:** `/api/customers`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890"
  }
  ```

### Get Customers Details

- **URL:** `api/customerdetails`
- **Method:** `GET`

## Project Structure

```
customer-api/
├── models/
│   └── Customer.js
├── routes/
│   └── customers.js
├── server.js
├── package.json
└── README.md
```

---

This README provides a straightforward overview of how to set up and use the Customer API.
