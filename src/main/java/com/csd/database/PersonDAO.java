package com.csd.database;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Service;
import com.csd.database.Entity.Person;

import java.util.ArrayList;
import java.util.List;


@Service
public class PersonDAO {
    private SessionFactory sessionFactory;
    private Session session = null;


    public PersonDAO() {
        sessionFactory = HibernateSessionFactory.getSessionFactory();
    }


    private void startSession() {
        if(session == null){
            session = sessionFactory.openSession();
        }
    }

    private void endSession() {
        if(session != null){
            session.close();
            session = null;
        }
    }

    public int delete(Integer id){
        startSession();
        session.beginTransaction();

        Query query = session.createQuery("delete Person where id = :param");
        query.setParameter("param", id);
        int count = query.executeUpdate();

        session.getTransaction().commit();
        return count;
    }

    public void save(Person person){
        Person other = getById(person.getId());

        startSession();
        session.beginTransaction();

        if(other == null){
            session.saveOrUpdate(person);
        }else{
            other.updateData(person);
            session.saveOrUpdate(other);
        }

        session.getTransaction().commit();
    }

    public Person getById(Integer id){
        startSession();
        session.beginTransaction();
        Person person = session.get(Person.class, id);

        session.getTransaction().commit();
        return person;
    }



    public List<Person> getAll() {
        startSession();
        session.beginTransaction();

        Query query = session.createQuery("from Person");
        List<Person> list = query.list();

        session.getTransaction().commit();

        if(list == null || list.size() < 1){
            return new ArrayList<>();
        }else{
            return list;
        }
    }
}
