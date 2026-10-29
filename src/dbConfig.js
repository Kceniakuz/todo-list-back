import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected");
    } catch (error) {
        console.log(`Connecting error: ${error.message}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await prisma.$disconnect();
};