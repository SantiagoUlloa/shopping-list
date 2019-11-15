package com.example.shoppingapi.repository;

import com.example.shoppingapi.model.Todos;
import com.example.shoppingapi.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodosRepository extends CrudRepository<Todos, Long> {

}
