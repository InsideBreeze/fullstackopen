const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length}</p>
    <p>${new Date().toString()}</p>
    `);
});

app.get("/api/persons", (request, response) => {
  response.send(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return response.status(404).end();
  }
  response.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  // name or number missing
  if (!(name && number)) {
    return res.status(400).json({ error: "name or number missing" });
  }
  // name existed
  if (persons.map((person) => person.name).includes(name)) {
    return res.status(400).json({ error: "name is already existed" });
  }
  const id = Math.floor(Math.random() * 10000); //Magic Number
  const person = { id, name, number };
  persons = persons.concat(person);
  res.status(201).json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
