package com.example.shoppingapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.shoppingapi.model.Todos;
import com.example.shoppingapi.repository.TodosRepository;
import org.springframework.stereotype.Service;

@Service
public class TodosServiceImpl implements TodosService {

    @Autowired
    TodosRepository todosRepository;

    @Autowired
    TodosService todosService;

    @Override
    public Todos addTodoToDB(Todos newTodo) {
        return todosRepository.save(newTodo);
    }

    @Override
    public Iterable<Todos> listTodos() {
        return todosRepository.findAll();
    }

}
