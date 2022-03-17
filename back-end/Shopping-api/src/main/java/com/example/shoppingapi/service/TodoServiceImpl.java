package com.example.shoppingapi.service;

import com.example.shoppingapi.controller.SecurityController;
import com.example.shoppingapi.model.User;
import com.example.shoppingapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.shoppingapi.model.Todo;
import com.example.shoppingapi.repository.TodoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SecurityController securityController;

    @Override
    public Todo addTodoToDB(Todo newTodo) {
        String username = securityController.getCurrentUserName();
        User user = userRepository.findByUsername(username);
        newTodo.setUser(user);
        return todoRepository.save(newTodo);
    }

    @Override
    public Iterable<Todo> listTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Iterable<Todo> listTodosOfUser() {
        String username = securityController.getCurrentUserName();
        Long userId = userRepository.findByUsername(username).getId();
        return todoRepository.findTodosByUserId(userId);
    }

    @Override
    public ResponseEntity deleteTodoByIdInDB(Long postId) {
        String username = securityController.getCurrentUserName();
        if(todoRepository.findById(postId).get().getUser().getUsername().equals(username)) {
            todoRepository.deleteById(postId);
            return new ResponseEntity(HttpStatus.valueOf(200));
        } else {
            return new ResponseEntity(HttpStatus.valueOf(405));
        }

}}
