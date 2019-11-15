package com.example.shoppingapi.service;

import com.example.shoppingapi.model.Todos;

public interface TodosService {

    public Todos addTodoToDB(Todos newTodo);

    public Iterable<Todos> listTodos();



}