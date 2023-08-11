package com.xwiggy.food.dao;

import com.xwiggy.food.model.Contact;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactDaoImpl{

    @Autowired
    ContactDao contactDao;

    public boolean saveMessage(Contact contact){
        contactDao.save(contact);
        return true;
    }

    public List<Contact> getAllFeedback() {
        // Delegate the call to the ContactDao to fetch all user feedback
        return contactDao.findAll();
    }

}
