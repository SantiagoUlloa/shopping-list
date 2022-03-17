package com.example.shoppingapi.service;


import com.example.shoppingapi.model.Todo;
import com.example.shoppingapi.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface UserService extends UserDetailsService{

    public User getUser(String username);

    public Iterable<User> listUsers();

    public String createUser(User newUser);

    public String login(User user);

    public HttpStatus deleteUserById(Long userId);
}

