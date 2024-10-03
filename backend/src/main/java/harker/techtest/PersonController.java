package harker.techtest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;

    // Change these to be the URL paths you want
    private final String getPath = "";
    private final String postPath = "";

    @GetMapping(getPath)
    public List<Person> getPeople() {
        return personService.getAllPeople();
    }

    @GetMapping(getPath + "/{id}")
    public Person getPerson(@PathVariable("id") String id) {
        return personService.getPerson(id);
    }

    @PostMapping(postPath)
    public Person postPerson(@RequestBody Person personModel) {
        return personService.postPerson(personModel);
    }

    // Task 3
    
}