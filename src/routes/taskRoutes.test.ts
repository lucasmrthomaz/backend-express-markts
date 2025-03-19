import request from "supertest";
import express from "express";
import taskRoutes from "./taskRoutes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use("/", taskRoutes);

beforeEach(async () => {
    await prisma.tasks.deleteMany();
});

describe("Task Routes", () => {
    it("should get all tasks with pagination", async () => {
        
        // Mocking data...
        await prisma.tasks.createMany({
            data: [
                { description: "Task 1", status: "OPEN" },
                { description: "Task 2", status: "IN_PROGRESS" },
                { description: "Task 3", status: "DONE" },
                { description: "Task 4", status: "OPEN" },
                { description: "Task 5", status: "IN_PROGRESS" },
            ],
        });

        const res = await request(app).get("/").query({ page: "1", limit: "2" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.tasks.length).toEqual(2);
        expect(res.body.page).toEqual(1);
        expect(res.body.limit).toEqual(2);
        expect(res.body.totalTasks).toEqual(5);
        expect(res.body.totalPages).toEqual(3);
    });

    it("should handle errors when fetching tasks", async () => {

        // Throwing an error to simulate a failed database query
        jest.spyOn(prisma.tasks, "findMany").mockImplementation(() => {
            throw new Error("Failed to fetch tasks");
        });

        const res = await request(app).get("/");

        expect(res.body).not.toBeNull();
        
        // Restore the original implementation to prevent side effects
        jest.spyOn(prisma.tasks, "findMany").mockRestore();
    });
});