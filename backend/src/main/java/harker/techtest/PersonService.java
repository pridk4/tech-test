package harker.techtest;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public List<Person> getAllPeople() {
        List<Person> people = new ArrayList<>();

        personRepository.findAll().forEach(people::add);

        return people;
    }

    public Person getPerson(String id) {
        return personRepository.findById(id).orElseThrow(() -> new RuntimeException("Value not present"));
    }

    public Person postPerson(Person person) {
        // Task 2
        
        if (person.getId().isEmpty()|| person.getId() == null) {
            throw new IllegalArgumentException("ID is a required value ");
        }

        if (person.getFirstName().isEmpty()|| person.getFirstName() == null) {
            throw new IllegalArgumentException("First name is a required value ");
        }

        if (person.getLastName().isEmpty()|| person.getLastName() == null) {
            throw new IllegalArgumentException("Last name is a required value ");
        }

        if (person.getDateOfBirth() == null) {
            throw new IllegalArgumentException("Date of Birth is a required value ");
        }

        if (person.getEmailAddress().isEmpty()|| person.getEmailAddress() == null) {
            throw new IllegalArgumentException("Email address is a required value ");
        }

        if (person.getPhoneNum().isEmpty()|| person.getPhoneNum() == null) {
            throw new IllegalArgumentException("Phone number is a required value ");
        }

        if (person.getAddress().isEmpty()|| person.getAddress() == null) {
            throw new IllegalArgumentException("Address is a required value ");
        }
        personRepository.save(person);
        return person;
    }
    

    public Person updatePerson(String id, Person updatedPer) {
        Person personToUpdate = personRepository.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));

        if (updatedPer.getFirstName() != null) {
            personToUpdate.setFirstName(updatedPer.getFirstName());
        }
        if (updatedPer.getLastName() != null) {
            personToUpdate.setLastName(updatedPer.getLastName());
        }
        if (updatedPer.getDateOfBirth() != null) {
            personToUpdate.setDateOfBirth(updatedPer.getDateOfBirth());
        }
        if (updatedPer.getEmailAddress() != null) {
            personToUpdate.setEmailAddress(updatedPer.getEmailAddress());
        }
        if (updatedPer.getPhoneNum() != null) {
            personToUpdate.setPhoneNum(updatedPer.getPhoneNum());
        }
        if (updatedPer.getAddress() != null) {
            personToUpdate.setAddress(updatedPer.getAddress());
        }

        return personRepository.save(personToUpdate);
    }

    public void deleteAllPeople() {
        personRepository.deleteAll();
    }

    public void deletePersonById(String id) {
        personRepository.deleteById(id);
    }
}