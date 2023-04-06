require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// getting all users
app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Creating a user
app.post("/", async (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  };
  const createUser = await prisma.user.create({ data });
  res.json({ success: true, createUser });
});

// getting a single user
app.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json(user);
});

// updating single field of user
app.put("/:id", async (req, res) => {
  const newAge = req.body.age;
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      age: newAge,
    },
  });
  res.json(user);
});

// deleting a user
app.delete("/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  
  res.json(user);
});

app.post("/house", async (req, res) => {
  const data = {
    userId: req.body.userId,
    wifiPassword: req.body.wifiPassword,
    address: req.body.address,
    builtById:req.body.builtById
  };
  const house = await prisma.house.create({
    data
  })
  res.json(house)
  
});

// you can also use createMany to add array of objects

app.get("/houses", async(req, res)=>{
    const allHouses=await prisma.house.findFirst({
      where:{
        id:"clg5ifpp600012ur30qnl5jbu"
      }
    })
    res.json(allHouses)
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
