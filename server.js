const express = require("express");
const sql = require("mssql");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3010;

// Route to get all products
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);

    res.json({
      message: "Products successfully retrieved",
      data: response.data,
    });
  } catch (err) {
    console.error("API error", err);
    res.status(500).send("Server Error");
  }
});

// Route to get a single product by ID,Route to get data
app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    //checks if has rating
    if (response.data.rating) {
      res.json({
        //shows only the required values
        name: response.data.title,
        description: response.data.description,
        price: response.data.price,
        category: response.data.category,
        image: response.data.image,
        rating: response.data.rating,
      });
    } else {
      res.json({
        //shows only the required values
        name: response.data.title,
        description: response.data.description,
        price: response.data.price,
        category: response.data.category,
        image: response.data.image,
      });
    }
  } catch (err) {
    console.error("API error", err);
    res.status(500).send("Server Error");
  }
});

// Route to get all carts
app.get("/carts", async (req, res) => {
  try {
    // בקשת GET לכל העגלות
    const response = await axios.get("https://fakestoreapi.com/carts");

    // שליחת התוצאות כ-JSON בתגובה
    res.json({
      message: "Carts successfully retrieved",
      data: response.data,
    });
  } catch (err) {
    console.error("API error", err);
    res.status(500).send("Server Error");
  }
});
// Route to update a cart by ID
app.put("/carts/:id", async (req, res) => {
  try {
    const cartId = req.params.id;

    // נתונים לעדכון בעגלה
    const updatedCartData = {
      userId: 3,
      date: "2023-09-05",
      products: [
        { productId: 1, quantity: 4 },
        { productId: 2, quantity: 2 },
      ],
    };

    // בקשת PUT לעדכון העגלה
    const response = await axios.put(
      `https://fakestoreapi.com/carts/${cartId}`,
      updatedCartData
    );

    // שליחת התוצאה כ-JSON בתגובה
    res.json({
      message: `Cart ${cartId} successfully updated`,
      data: response.data,
    });
  } catch (err) {
    console.error("API error", err);
    res.status(500).send("Server Error");
  }
});
// Route to update a cart with body data
app.get("/carts/:id/update", async (req, res) => {
  try {
    const cartId = req.params.id;

    // קבלת הנתונים מהגוף של הבקשה
    const { userId, productId, quantity } = req.body;

    console.log("Received update request for cart:", cartId);
    console.log("Update data:", { userId, productId, quantity });

    // נתונים לעדכון בעגלה
    const updatedCartData = {
      userId: userId, // מזהה המשתמש
      date: new Date().toISOString().split("T")[0], // תאריך עדכני
      products: [{ productId: productId, quantity: quantity }],
    };

    console.log("Updated cart data:", updatedCartData);

    // בקשת PUT לעדכון העגלה
    const response = await axios.put(
      `https://fakestoreapi.com/carts/${cartId}`,
      updatedCartData
    );

    console.log("Response from API:", response.data);

    // שליחת התוצאה כ-JSON בתגובה
    res.json({
      message: `Cart ${cartId} successfully updated`,
      data: response.data,
    });
  } catch (err) {
    console.error("API error", err);
    res.status(500).send("Server Error");
  }
});

//use this us a template
//http://localhost:3010/ANP?title=Test%20Title&price=100&description=Great%20Product&image=https://i.pravatar.cc&category=electronics
app.get("/ANP", async (req, res) => {
  try {
    const title = req.query.title || "default title"; // 'default title' is used if title is not provided
    const price = req.query.price || "0"; // default price of 0
    const description = req.query.description || "default description";
    const image = req.query.image || "https://i.pravatar.cc"; // Default image URL
    const category = req.query.category || "default category";

    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const data = {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    };
    const response = await axios.post(
      `https://fakestoreapi.com/products`,
      data,
      headers
    );
    res.json(response.data);
  } catch (err) {
    console.error("server error", err);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
