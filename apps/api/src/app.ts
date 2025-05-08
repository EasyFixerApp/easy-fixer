import prisma from "#lib/prisma.js";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.get("/test-db", async (req, res) => {
  const user = await prisma.user.upsert({
    create: {
      email: "alice@example.com",
      name: "Alice",
    },
    update: {},
    where: {
      email: "alice@example.com",
    },
  });

  res.json(user);
});

export default app;
