package com.example.shoppingapi.repository;

import com.example.shoppingapi.model.Todo;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
    @Query("FROM todos t WHERE t.user_id = ?0")
    public List<Todo> findTodosByUserId(Long userId);

}
