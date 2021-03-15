package com.devopsuh.dockerexample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("*")
public class DefaultController {
    
    @RequestMapping(method = RequestMethod.GET)
    public String view(Model model) {
        return "index";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String press(Model model) {
        model.addAttribute("press", "Success");
        return "index";
    }
}
