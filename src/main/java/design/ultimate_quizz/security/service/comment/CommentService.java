package design.ultimate_quizz.security.service.comment;

import design.ultimate_quizz.entities.Comment;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.security.dto.comment.CommentRequest;
import design.ultimate_quizz.security.dto.comment.CommentResponse;

import java.util.List;
import java.util.Optional;

public interface CommentService {

    Optional<Comment> getCommentById(int id);

    Comment addComment(CommentRequest commentRequest);

    List<Comment> getComments();

    List<Comment> getCommentsByUser(Optional<User> user);

    void deleteComment(int id);
}
