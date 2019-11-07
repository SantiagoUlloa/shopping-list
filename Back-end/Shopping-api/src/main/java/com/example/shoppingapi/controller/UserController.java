package com.example.shoppingapi.controller;

import com.example.shoppingapi.model.JwtResponse;
import com.example.shoppingapi.model.User;
import com.example.shoppingapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        return ResponseEntity.ok(new JwtResponse(userService.createUser(newUser)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return ResponseEntity.ok(new JwtResponse(userService.login(user)));
    }

    // Can only the admin see the list of all users?
    // We'll think about this more later
    // @PreAuthorize("hasRole('ROLE_ADMIN')") <-- this line caused an error. Will fix later
//    @GetMapping("/user/list")
//    public Iterable<User> listUsers() {
//        return userService.listUsers();
//    }

//    @DeleteMapping("/user/{userId}")
//    public HttpStatus deleteUserById(@PathVariable Long userId) {
//        return userService.deleteUserById(userId);
//    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World!!";
    }


}