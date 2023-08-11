package com.xwiggy.food.dao;

import com.xwiggy.food.model.Login;
import com.xwiggy.food.model.User;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserDaoImpl{

    @Autowired
    private UserDao userDao;


    public void register(User user) {
        userDao.save(user);
    }

    public User validateUser(Login login) {
        User user = null;
        // Assuming the username is a unique identifier for a user in the database
        // First, check if a user with the given username exists
        if (userDao.findByUsername(login.getUsername()).isPresent()) {
            user = userDao.findByUsername(login.getUsername()).get();
            // Validate the password
            if (!user.getPassword().equals(login.getPassword())) {
                user = null;
            }
        }
        return user;
    }
    public Boolean usernameExists(String username)
    {
       return userDao.findByUsername(username).isPresent();
    }

    
    public User updateUser(User updatedUser) {
        User user = null;
        if (userDao.findByUsername(updatedUser.getUsername()).isPresent()) {
            user = userDao.findByUsername(updatedUser.getUsername()).get();
            // Update the user properties
            user.setFirstname(updatedUser.getFirstname());
            user.setLastname(updatedUser.getLastname());
            user.setEmail(updatedUser.getEmail());
            user.setAddress(updatedUser.getAddress());
            user.setPhone(updatedUser.getPhone());
            user.setUsername(updatedUser.getUsername());
            // Save the updated user
            user = userDao.save(user);
        }
        return user;
    }

    
    public void deleteUserByUsername(String username) {
        User user = userDao.findByUsername(username)
            .orElseThrow(() -> new NoSuchElementException("User not found with username: " + username));
        userDao.delete(user);
    }
	
}
