package com.xwiggy.food.dao;

import com.xwiggy.food.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, String> {
	
	 Optional<User> findByUsername(String username);

	
	
}
