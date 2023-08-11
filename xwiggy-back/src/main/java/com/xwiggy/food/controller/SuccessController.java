package com.xwiggy.food.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SuccessController 
{
	@GetMapping("/success")
    public String showSuccessPage() {
        return "success"; // This will return the view name "success", which corresponds to the HTML template.
    }
}
