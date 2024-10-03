package harker.techtest;

import java.util.ArrayList;
import java.util.List;

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

        return person;
    }
    
}