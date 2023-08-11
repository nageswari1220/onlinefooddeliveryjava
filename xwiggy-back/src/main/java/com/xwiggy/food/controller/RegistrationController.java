package com.xwiggy.food.controller;

import com.xwiggy.food.dao.UserDaoImpl;
import com.xwiggy.food.model.User;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
public class RegistrationController
{

    @Autowired
    private UserDaoImpl userDao;

    @RequestMapping("/api/register")
    public User showRegister() {
        return new User();
    }

    @PostMapping("/register")
    public User addUser(@RequestBody User user, Model model) {
    	
        System.out.println(user.toString());
        userDao.register(user);
        return user;
    }
    
    @PostMapping("/checkUserName")
    public boolean checkAvailability(@RequestBody String username, Model model)
    {
        return userDao.usernameExists(username);
    }
    
    @PutMapping("/update")
    public User updateUser(@RequestBody User updatedUser) {
        return userDao.updateUser(updatedUser);
    }
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        try {
            userDao.deleteUserByUsername(username);
            return ResponseEntity.ok("User account deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user account.");
        }
    }
}

