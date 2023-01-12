import React from "react";
import phonebookService from "../services/phonebookService";

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService.deltePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };
  return (
    <div className="">
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.name, person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
