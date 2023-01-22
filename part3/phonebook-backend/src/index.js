const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
//app.use(morgan("tiny"));

const data = morgan.token("data", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
};
/* let persons = [
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
];*/

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    response.send(`
    <p>Phonebook has info for ${count}</p>
    <p>${new Date().toString()}</p>
    `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }
      response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((removedPerson) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  // name or number missing
  if (!(name && number)) {
    return res.status(400).json({ error: "name or number missing" });
  }
  // name already existed, when current page is not updated, but the name is added to the db
  Person.find({ name }).then((personExisted) => {
    console.log(personExisted);
    if (personExisted.length > 0) {
      return res
        .status(400)
        .json({ error: `name is already existed: ${personExisted[0].name}` });
    }
    const person = new Person({ name, number });
    person.save().then((savedPerson) => {
      return res.status(201).json(savedPerson);
    });
  });
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const { name, number } = req.body;
  const personToUpdate = { name, number };

  Person.findByIdAndUpdate(id, personToUpdate, { new: true }).then(
    (updatedPerson) => {
      res.json(updatedPerson);
    }
  );
});

app.use(errorHandler);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
