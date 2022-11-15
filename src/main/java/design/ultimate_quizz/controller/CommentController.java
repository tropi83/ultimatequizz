package design.ultimate_quizz.controller;


import design.ultimate_quizz.entities.Comment;
import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.security.dto.comment.CommentRequest;
import design.ultimate_quizz.security.service.comment.CommentService;
import design.ultimate_quizz.security.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @GetMapping("comments/{id}")
    public ResponseEntity<Comment> getComment(@PathVariable("id") int id)
    {
        Optional<Comment> comment = this.commentService.getCommentById(id);

        return comment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("comments")
    public List<Comment> getComments(){
        return this.commentService.getComments();
    }

    @GetMapping("comments/user/{id}")
    public ResponseEntity<List<Comment>> getCommentsByUser(@PathVariable("id") int id){
        Optional<User> existUser = userService.getUserById(id);
        if(existUser.isPresent())
        {
            return ResponseEntity.status(HttpStatus.OK).body(this.commentService.getCommentsByUser(existUser));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("comments")
    public ResponseEntity<Comment> addComment(@Valid @RequestBody CommentRequest commentRequest)
    {
        final Comment commentResponse = commentService.addComment(commentRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(commentResponse);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("comments/{id}")
    public void deleteComment(@PathVariable("id") int id) {

        this.commentService.deleteComment(id);
    }
}
