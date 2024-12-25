package harker.techtest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;

    // Change these to be the URL paths you want
    private final String getPath = "/people";
    private final String postPath = "/people";

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
    @PutMapping(postPath + "/{id}")
    public Person updatePerson(@PathVariable("id") String id,@RequestBody Person updatPerson) {
        return personService.updatePerson(id,updatPerson);
    }

    //  Delete All People
    @DeleteMapping(getPath)
    public String deleteAllPeople() {
        personService.deleteAllPeople();
        return "All records have been deleted successfully.";
    }

    //  Delete a Single Person by ID
    @DeleteMapping(getPath + "/{id}")
    public String deletePersonById(@PathVariable("id") String id) {
        personService.deletePersonById(id);
        return "Person with ID " + id + " has been deleted successfully.";
    }
    
}