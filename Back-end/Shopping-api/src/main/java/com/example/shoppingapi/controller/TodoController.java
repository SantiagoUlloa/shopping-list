package com.example.shoppingapi.controller;

import com.example.shoppingapi.model.Todos;
import com.example.shoppingapi.service.TodosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TodoController {

    @Autowired
    TodosService todosService;

    @PostMapping("/todo/add")
    public Todos addTodo(@RequestBody Todos newTodo) {
        return todosService.addTodoToDB(newTodo);
    }

    @GetMapping("/todo/list")
    public Iterable<Todos> listTodos() {
        return todosService.listTodos();
    }
}