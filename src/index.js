import express from "express";
import { connectToDatabase } from "./config/db.js";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(express.json());

async function startServer() {
  const client = await connectToDatabase();

  if (client) {
    const db = client.db("productReceta");

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use("/api", productRouter);

    app.listen(3000, () => {
      console.log("Servidor corriendo en el puerto 3000");
    });
  }
}

startServer();
