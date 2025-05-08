import prisma from "#lib/prisma.js";
import express from "express";

const app = express();
const port = process.env.PORT ?? "9001";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.get("/test-db", async (req, res) => {
  // const users = await prisma.user.findMany();
  // res.json(users);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
