package design.ultimate_quizz.controller;


import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.security.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") int id)
    {
        Optional<User> user = this.userService.getUserById(id);

        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("users")
    public List<User> getUsers(){
        return this.userService.getUsers();
    }

}
