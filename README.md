Here’s a template for your project's README file that will help you organize and present it on GitHub:

---

# API Automation and Unit Testing with Jest, Supertest, and Express

This repository demonstrates **API automation**, **unit testing**, and **integration testing** using **Jest**, **Supertest**, and **Express**. It includes interactions with a third-party API (`fakestoreapi.com`) to fetch and manipulate product data.

## Features

- **Unit Testing**: Covers the basic operations and API calls with mock functions using **Jest**.
- **Integration Testing**: Simulates actual HTTP requests to the `fakestoreapi.com` and validates responses using **Supertest**.
- **API Endpoints**: Implemented with **Express** for viewing and manipulating product details.
- **Configuration**: Manages API keys and sensitive data securely using **dotenv**.

## API Endpoints

1. **View All Products**  
   Fetches all products from the `Fake Store API`.  
   **Endpoint**: `/allProducts`  
   **Method**: `GET`

2. **View Product Details**  
   Fetches product details by product ID, with an option to add the product to a cart.  
   **Endpoint**: `/VPD/:add`  
   **Method**: `GET`  
   **Parameters**:

   - `prodId`: Product ID (default: `1`)
   - `userId`: User ID (default: `1`)
   - `add`: Flag to add product to cart (`true`/`false`)

3. **Add New Product (Admin)**  
   Adds a new product to the store using provided query parameters.  
   **Endpoint**: `/ANP`  
   **Method**: `GET`  
   **Query Parameters**:
   - `title`: Product title (default: `default title`)
   - `price`: Product price (default: `0`)
   - `description`: Product description (default: `default description`)
   - `image`: Product image URL (default: `https://i.pravatar.cc`)
   - `category`: Product category (default: `electronics`)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nimrodamos/API_Auto_Unit_Integ_Testing.git
   cd API_Auto_Unit_Integ_Testing
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file to store your environment variables, such as the port and API keys:

   ```
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Testing

Run the unit tests using **Jest**:

```bash
npm run test:unit
```

Run the integration tests:

```bash
npm run test:integration
```

### Example Test Case

The unit test for the `/VPD/:add` endpoint simulates a successful API call to fetch product details:

```javascript
it("GET /VPD/:add should return product details", async () => {
  axios.get.mockResolvedValue({ data: { title: "Test Product", price: 20 } });
  const response = await request(app).get("/VPD/false?prodId=1&userId=1");
  expect(response.body.name).toBe("Test Product");
});
```

## Project Structure

- **server.js**: Defines the Express server and API endpoints.
- **tests/app.unit.test.js**: Unit tests for individual functions and API calls.
- **tests/app.integration.test.js**: Integration tests for simulating API requests.

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express**: Web framework for building the API.
- **Axios**: Promise-based HTTP client for API requests.
- **Jest**: JavaScript testing framework for unit tests.
- **Supertest**: Library for testing HTTP requests in Node.js.
- **dotenv**: For managing environment variables.
