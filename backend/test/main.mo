import Nat "mo:base/Nat";
import Debug "mo:base/Debug";

actor {
    // Definición de los tipos de datos
    type Person = {
        id: Nat;
        firstName: Text;
        lastName: Text;
        birthDate: Text;
    };

    var people: [Person] = [];
    var nextId: Nat = 1;

    // Crear una nueva persona
    public func createPerson(firstName: Text, lastName: Text, birthDate: Text): async Nat {
        let newPerson = {
            id = nextId;
            firstName = firstName;
            lastName = lastName;
            birthDate = birthDate;
        };
        people := Array.append(people, [newPerson]);
        nextId += 1;
        return newPerson.id;
    };

    // Leer una persona por ID
    public func readPerson(id: Nat): async ?Person {
        return Array.find<Person>(people, func (person) { person.id == id });
    };

    // Leer todas las personas
    public func readAllPeople(): async [Person] {
        return people;
    };

    // Actualizar una persona por ID
    public func updatePerson(id: Nat, firstName: Text, lastName: Text, birthDate: Text): async ?Person {
        var updatedPerson: ?Person = null;
        people := Array.map<Person, Person>(people, func (person) {
            if (person.id == id) {
                updatedPerson := ?{
                    id = id;
                    firstName = firstName;
                    lastName = lastName;
                    birthDate = birthDate;
                };
                return Option.get(updatedPerson);
            };
            return person;
        });
        return updatedPerson;
    };

    // Eliminar una persona por ID
    public func deletePerson(id: Nat): async ?Person {
        let index = Array.indexOf<Person>(people, func (person) { person.id == id });
        if (Option.isSome<Nat>(index)) {
            let idx = Option.get<Nat>(index);
            let deletedPerson = people[idx];
            people := Array.filter<Person>(people, func (person) { person.id != id });
            return ?deletedPerson;
        };
        return null;
    };
};
