package com.xwiggy.food.dao;

import com.xwiggy.food.model.Contact;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactDao extends JpaRepository<Contact,Integer> {

	List<Contact> findAll();
}
