package com.example.shoppingapi.service;

import com.example.shoppingapi.config.JwtUtil;
import com.example.shoppingapi.controller.SecurityController;
import com.example.shoppingapi.model.Todos;
import com.example.shoppingapi.model.User;
import com.example.shoppingapi.repository.TodosRepository;
import com.example.shoppingapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TodosRepository todosRepository;

    @Autowired
    TodosService todosService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    SecurityController securityController;

    @Autowired
    @Qualifier("encoder")
    PasswordEncoder bCryptPasswordEncoder;




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);

        if(user==null)
            throw new UsernameNotFoundException("User null");
        // Code edited to not include bCrypt
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                true, true, true, true, getGrantedAuthorities(user));
    }

    private List<GrantedAuthority> getGrantedAuthorities(User user){
        List<GrantedAuthority> authorities = new ArrayList<>();

        // authorities.add(new SimpleGrantedAuthority(user.getUserRole().getName()));
        authorities.add(new SimpleGrantedAuthority("USER"));
        authorities.add(new SimpleGrantedAuthority(user.getUsername()));

        return authorities;
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

//    @Override
//    public Iterable<User> listUsers() {
//        return userRepository.findAll();
//    }

    @Override
    public String createUser(User newUser) {
//        UserRole userRole = userRoleService.getRole(newUser.getUserRole().getName());
//        newUser.setUserRole(userRole);
        newUser.setPassword(newUser.getPassword());
        if(userRepository.save(newUser) != null){
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        return null;
    }

    @Override
    public String login(User user){
        User newUser = userRepository.findByUsername(user.getUsername());
//      Code edited to not use default bCrypt for password.
        if(newUser != null && user.getPassword().equals(newUser.getPassword())){
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        return null;
    }

//    @Override
//    public HttpStatus deleteUserById(Long userId){
//        userRepository.deleteById(userId);
//        return HttpStatus.OK;
//    }


    @Override
    public Iterable<Todos> addTodosToUserList(String username, Long todo_id) {
        Todos todo = todosRepository.findById(todo_id).get();
        User user = getUser(username);
        user.addTodoToList(todo);

        todosRepository.save(todo);
        return user.getTodos();
    }

    public Iterable<Todos> deleteTodosFromUserList(String username, Long todo_id) {
        Todos todo = todosRepository.findById(todo_id).get();
        User user = getUser(username);
        user.deleteTodosFromList(todo);

        userRepository.save(user);
        return user.getTodos();
    }

    @Override
    public List<Todos> listUserTodoList() {

        User user = userRepository.findByUsername(securityController.getCurrentUserName());
        return user.getTodos();
    }


}