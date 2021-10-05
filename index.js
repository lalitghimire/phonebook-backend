const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const PORT = process.env.PORT

// middlewares
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

// error handler function
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

// new token using morgan
morgan.token('postedData', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
})

app.use(
    morgan(
        ':method :url :status  :res[content-length] - :response-time ms :postedData'
    )
)

//routes
// route to home
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

console.log(Person)
// route which display some info on number of persons
app.get('/info', (req, res) => {
    let dateNow = Date(Date.now())
    Person.find({}).then((persons) => {
        res.send(
            `<p>Phonebook has info for ${persons.length} people</p> ${dateNow}<p> </p>`
        )
    })
})

// route to display all persons
// app.get("/api/persons", (req, res) => {
//   res.send(persons);
// });

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

// route to display one person with id
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.send(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => {
            console.log('this is error in id')
            next(error)
        })
})

// route to add person to person list
app.post('/api/persons', (req, res, next) => {
    const body = req.body

    // check for missing info and if so send error response
    // if (!body.name || !body.number) {
    //   return res.status(400).json({ error: "name or number missing" });
    // }

    // check if duplicate name and if so send error response(before using mongoDB)
    // if (persons.filter((person) => person.name === body.name).length > 0) {
    //   return res.status(400).json({ error: "provide unique name" });
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    // when using locally
    //persons = persons.concat(person);
    //res.send(person);

    // saving to database
    person
        .save()
        .then((savedPerson) => {
            console.log(savedPerson)
            res.send(savedPerson)
        })
        .catch((error) => next(error))
})

// route to delete a person
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => next(error))
})

// route to update already existing name
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    //self note: while updating with put don't use person = new Person but rather just js object
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then((updatedPerson) => {
            res.json(updatedPerson)
        })
        .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
