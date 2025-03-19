import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Create a new task for todo list
router.post("/", async (req, res) => {
    const { description, status } = req.body;

    try {
        const task = await prisma.tasks.create({
            data: {
                description,
                status,
            },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

// Get All Tasks with batteries included (Pagination feature)
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;
    const skip = (page - 1) * limit;

    try {
        const tasks = await prisma.tasks.findMany({
            skip,
            take: limit,
        });
        const totalTasks = await prisma.tasks.count();
        const totalPages = Math.ceil(totalTasks / limit);

        res.json({
            tasks,
            page,
            limit,
            totalTasks,
            totalPages,
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Get a single task by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.tasks.findUniqueOrThrow({
            where: { id },
        });

        res.json(task);
    } catch (error) {
        if ((error as { name?: string }).name === "NotFoundError") {
            res.status(404).json({ error: "Task not found" });
        } else {
            res.status(500).json({ error: "Failed to fetch task" });
        }
    }
});

// Update a task by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { description, status } = req.body;

    try {
        const task = await prisma.tasks.update({
            where: { id },
            data: {
                description,
                status,
            },
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.tasks.delete({
            where: { id },
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});

export default router;