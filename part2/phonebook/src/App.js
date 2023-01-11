import axios from "axios";
import { useEffect, useState } from "react";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  //const [persons, setPersons] = useState([
  //  { name: "Arto Hellas", number: "040-1234567" },
  //]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      setNewName("");
      setNewNumber("");
      return alert(`${newName} is already added to phonebook`);
    }
    const newPersons = persons.concat({ name: newName, number: newNumber });
    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <AddPerson
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
