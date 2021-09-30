const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://lalit:${password}@myprojects.haz0t.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

// person.save().then((result) => {
//   console.log(`added ${person.name} number ${person.number} to the phonebook`);
//   mongoose.connection.close();
// });

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
