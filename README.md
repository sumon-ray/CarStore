
# Car Store  
# Link- https://car-store-amber.vercel.app/


The **Car Store** is a web application designed to manage the inventory and orders of cars in a store. It provides a robust API that allows users to perform CRUD operations on car data, create orders, and manage car availability. This project utilizes **Node.js**, **Express**, **MongoDB**, and **Mongoose**.


## Features

- **CRUD Operations for Cars**: Create, Read, Update, and Delete car data, including fields such as brand, model, price, quantity, and availability.

  
- **Order Management**: Users can place orders for cars, featuring email validation, stock quantity checks, and total price calculation.

  
- **Stock Management**: The system automatically updates car quantities when an order is placed, ensuring accurate inventory tracking.

  
- **Email Validation**: Validates customer emails before creating an order.

  
- **Error Handling**: Comprehensive error handling for scenarios like invalid input, insufficient stock, and missing data.

  
- **Data Validation**: Mongoose-based validation for all fields to ensure data integrity.



## Technology Stack
### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose ORM**
  
### Validation
- **Mongoose Schema Validation**
- **Email and Quantity Validation**

### Error Handling
- Custom error handling for common issues like missing data or insufficient stock. 
## API Endpoints
- **Car CRUD**: `/api/cars`
- **Order CRUD**: `/api/orders`

## Getting Started
### Prerequisites 


Before running the project locally, ensure you have the following installed:

- **Node.js**: [Install Node.js](https://nodejs.org/)
  
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) or use MongoDB Atlas for a cloud-based database.

   git clone https://github.com/yourusername/car-store.git
   cd car-store
