import { config } from "dotenv";
import express from "express";
import { connectDB, disconnectDB } from "./dbConfig.js";
import cors from "cors";
import router from "./routes.js";

config();
connectDB();

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

const server = app.listen("5000", () => {
    console.log("Server is running on port 5000");
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) => {
    console.error("Unhandled Exception:", err);

    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.error("SIGTERM received, shutting down");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});