package com.example.shoppingapi.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //throws error when username exists
    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToMany(fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH,
                    CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "user_todolist",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = @JoinColumn(name = "todo_id"))
    private List<Todos> todos;

    public List<Todos> addTodoToList (Todos todo) {
        if(todos == null)
            todos = new ArrayList<>();
        todos.add(todo);

        return todos;
    }

    public List<Todos> deleteTodosFromList (Todos todo) {
        try {
            todos.remove(todo);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return todos;
    }

    public List<Todos> getTodos() {return todos;}

    public void setTodos(List<Todos> todos) {this.todos = todos;}

    public User() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



}


