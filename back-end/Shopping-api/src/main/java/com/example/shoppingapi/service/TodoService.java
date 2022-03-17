package com.example.shoppingapi.service;

import com.example.shoppingapi.model.Todo;
import org.springframework.http.ResponseEntity;

public interface TodoService {

    public Todo addTodoToDB(Todo newTodo);

    public Iterable<Todo> listTodos();

    public Iterable<Todo> listTodosOfUser();

    public ResponseEntity deleteTodoByIdInDB(Long postId);

}