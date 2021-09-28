const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

// persons
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

//routes
// route to home
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// route which display some info on number of persons
app.get("/info", (req, res) => {
  let dateNow = Date(Date.now());
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> ${dateNow}<p> </p>`
  );
});

// route to display all persons
app.get("/api/persons", (req, res) => {
  res.send(persons);
});

// route to display one person with id
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send("Person not found");
  }
});

// route to delete a person
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// route to add person to persosn list
app.post("/api/persons", (req, res) => {
  const body = req.body;

  const person = {
    id: Math.floor(Math.random() * 9996) + 5,
    name: body.name,
    number: body.number,
  };

  // check for missing info and if so send error response
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  // check if duplicate name and if so send error response
  if (persons.filter((person) => person.name === body.name).length > 0) {
    return res.status(400).json({ error: "provide unique name" });
  }

  persons = persons.concat(person);
  res.send(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
