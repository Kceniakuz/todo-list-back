import { prisma } from "./dbConfig.js";

export const getTasks = async (req, res) => {
    const tasks = await prisma.tasks.findMany();

    res.status(200).json({ tasks });
};

export const addTask = async (req, res) => {
    const { note } = req.body;

    if (!note) res.status(404).json({ error: "Note is required" });

    const task = await prisma.tasks.create({ data: { note } });

    res.status(201).json({ task });
};

export const deleteTask = async (req, res) => {
    const id = req.params.id;

    if (!id) res.status(404).json({ error: "Task ID is required" });

    const task = await prisma.tasks.findUnique({ where: { id } });

    if (!task) res.status(404).json({ error: "Cannot find task" });

    await prisma.tasks.delete({ where: { id } });

    res.status(204).end();
};