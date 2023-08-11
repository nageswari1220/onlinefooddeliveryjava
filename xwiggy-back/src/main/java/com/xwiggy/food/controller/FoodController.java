package com.xwiggy.food.controller;

import com.xwiggy.food.dao.FoodDaoImpl;
import com.xwiggy.food.model.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin
public class FoodController {

    @Autowired
    FoodDaoImpl foodDao;

    @RequestMapping(value = "/menu")
    public List<Food> getMenu(Model model) {
        List<Food> foodItems ;
        foodItems = foodDao.getFoodList();
        return foodItems;
    }
    
    /*
    @PutMapping("/menuupdate")
    public ResponseEntity<Food> updateFoodQuantity(@RequestBody Food updateRequest) {
        String productId = updateRequest.getId();
        int newQuantity = updateRequest.getQuantity();

        Food updatedFood = foodDao.updateFoodQuantity(productId, newQuantity);
        if (updatedFood != null) {
            return ResponseEntity.ok(updatedFood);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/
    @PutMapping("/menuupdate")
    public ResponseEntity<Food> updateFoodQuantities(@RequestBody Food[] updateRequests) {
        for (Food request : updateRequests) {
            String productId = request.getId();
            int newQuantity = request.getQuantity();
            Food updatedFood = foodDao.updateFoodQuantity(productId, newQuantity);
            if (updatedFood == null) {
                return ResponseEntity.notFound().build();
            }
        }
        return ResponseEntity.ok().build();
    }
}
