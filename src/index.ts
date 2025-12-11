import { PrismaClient } from "@prisma/client";
import { log } from "console";
import express from "express";

const client = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  let { username } = req.query;

  let user = await client.user.findFirst({
    where: {
      username: username as string,
    },
  });

  if (!user) {
    res.json({ message: "User not found" });
    return;
  }

  res.json({
    username: user.username,
    password: user.password,
    age: user.age,
    city: user.city,
  });
});

app.post("/post", async (req, res) => {
  const message = req.body;
  const { username, password, age, city } = message;
  let user = await client.user.create({
    data: {
      username: username,
      password: password,
      age: age,
      city: city,
    },
  });

  const users = await client.user.findMany();
  console.log("users are ", users);

  res.json({ users });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
