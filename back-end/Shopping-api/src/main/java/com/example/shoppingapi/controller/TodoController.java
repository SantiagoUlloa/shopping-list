package com.example.shoppingapi.controller;

import com.example.shoppingapi.model.Todo;
import com.example.shoppingapi.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TodoController {
    @Autowired
    TodoService todoService;

    @PostMapping("/todo")
    public Todo addTodo(@RequestBody Todo todo) {
        return todoService.addTodoToDB(todo);
    }

    @GetMapping("/todo/list")
    public Iterable<Todo> listAllTodosToUser() { return todoService.listTodos(); }

    @GetMapping("todo/user/list")
    public Iterable<Todo> listOnlyUserTodos() { return todoService.listTodosOfUser(); }

    @DeleteMapping("todo/{todoId}")
    public ResponseEntity deleteTodoById(@PathVariable Long todoId) {
        return todoService.deleteTodoByIdInDB(todoId);
    }
}