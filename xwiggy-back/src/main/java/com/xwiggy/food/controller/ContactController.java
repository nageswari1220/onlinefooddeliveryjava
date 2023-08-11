package com.xwiggy.food.controller;

import com.xwiggy.food.dao.ContactDaoImpl;
import com.xwiggy.food.model.Contact;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ContactController {

    @Autowired
    ContactDaoImpl contactDao;

    @PostMapping("/contact")
    public boolean contactUs(@RequestBody Contact contact, Model model){
        return contactDao.saveMessage(contact);
    }
    @GetMapping("/getcontact")
    public List<Contact> getAllFeedback() {
        // Return all user feedback details
        return contactDao.getAllFeedback();
    }
	
}
