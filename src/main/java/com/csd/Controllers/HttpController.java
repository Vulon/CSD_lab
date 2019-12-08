package com.csd.Controllers;


import com.csd.Services.DivisorService;
import com.csd.database.Entity.Person;

import com.csd.database.HibernateSessionFactory;
import com.csd.database.PersonDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class HttpController {

    @Autowired
    private PersonDAO personDAO;




    @GetMapping(value = "/table")
    public ModelAndView table(){
        return new ModelAndView("table");
    }

    @GetMapping(value = {"/about", "/"})
    public ModelAndView about(){

        HashMap<String, String> params = new HashMap<String, String>();
        params.put("author", "Работу выполнял: Загидуллин Амир Равилевич");
        params.put("group", "Номер группы: ИКБО-02-17");
        params.put("task", "Номер индивидуального задания: 11");
        params.put("text", "Для каждого натурального числа в промежутке от m до n вывести все делители.\n Числа должны поступать в виде строки с некоторым разделителем; в массиве; отдельными значениями данных.");
        return new ModelAndView("about", params);
    }

    @GetMapping(value = "/divisor")
    public ModelAndView divisor(){
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("divisor", "Please enter start and end numbers:");
        params.put("submit", "Submit");

        return new ModelAndView("divisor", params);
    }

    //_________________________________________________________________________


    public HttpController() {
        //this.personSet = new HashSet<>();
    }

    //public Set<Person> personSet;

    @GetMapping("/divise")
    public ResponseEntity<String> callDivisorService(
            Integer start,
            Integer end
    ){
        DivisorService divisorService = new DivisorService(start, end);
        return new ResponseEntity<>(divisorService.getResult(), HttpStatus.OK);
    }

    @PostMapping("/person")
    public ResponseEntity<String> savePerson(
            @RequestBody Person person
    ){
//        boolean exists = false;
//        if(personSet.stream().anyMatch(person1 -> person1.getId().equals(person.getId()))){
//            exists = true;
//            personSet.removeIf(person1 -> person1.getId().equals(person.getId()));
//        }
//
//        boolean flag = personSet.add(person);
//        return new ResponseEntity<>("Person: " + person.toString() + " Added? " + flag + " updated? " + exists, HttpStatus.OK);

        personDAO.save(person);
        return new ResponseEntity<>("Worked",HttpStatus.OK);
    }
    @DeleteMapping("/person")
    public ResponseEntity<String> deletePerson(
            @RequestBody Integer id
    ){

//        boolean flag = personSet.removeIf(person -> person.getId().equals(id));
//        return new ResponseEntity<>("Deleted? " + flag, HttpStatus.OK);

        int count = personDAO.delete(id);
        return new ResponseEntity<>("Deleted? " + (count > 0), HttpStatus.OK);
    }

    @GetMapping("/person")
    public ResponseEntity<List<Person>> getPersons(){
//        return new ResponseEntity<>(personSet, HttpStatus.OK);
        return new ResponseEntity<>(personDAO.getAll(), HttpStatus.OK);
    }


}
