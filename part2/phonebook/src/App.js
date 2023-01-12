import { useEffect, useState } from "react";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebookService";

const App = () => {
  //const [persons, setPersons] = useState([
  //  { name: "Arto Hellas", number: "040-1234567" },
  //]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNofication] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    phonebookService.getPhoneBooks().then((data) => setPersons(data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const newPerson = { ...person, number: newNumber };
        return phonebookService
          .updatePerson(person.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNofication(
              `Information of ${newName} has already been removed from server`
            );
            setSuccess(false);
            setPersons(persons.filter((person) => person.name !== newName));
            setTimeout(() => setNofication(null), 3000);
            setNewName("");
            setNewNumber("");
          });
      }
    }

    const newPerson = { name: newName, number: newNumber };
    phonebookService.addPerson(newPerson).then((addedPerson) => {
      setPersons(persons.concat(addedPerson));
      setNofication(`Added ${newName}`);
      setTimeout(() => setNofication(null), 3000);
      setSuccess(true);
      setNewName("");
      setNewNumber("");
    });
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
      <Notification text={notification} success={success} />
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
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  );
};

export default App;
