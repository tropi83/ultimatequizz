package design.ultimate_quizz.security.service.comment;

import design.ultimate_quizz.entities.Comment;
import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.repository.CommentRepository;
import design.ultimate_quizz.repository.UserRepository;
import design.ultimate_quizz.security.dto.comment.CommentRequest;
import design.ultimate_quizz.service.CommentValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    private final CommentValidationService commentValidationService;

    @Override
    public Optional<Comment> getCommentById(int id) {
        return Optional.empty();
    }

    @Override
    public Comment addComment(CommentRequest commentRequest){
        commentValidationService.validateComment(commentRequest);

        final String commentText = commentRequest.getText();
        final String commentCreationDate = commentRequest.getCreationDate();
        final int userId = commentRequest.getUser_id();
        final User user = userRepository.getOne(userId);

        final Comment comment = new Comment(0,commentText,commentCreationDate,user);
        commentRepository.save(comment);

        log.info("{} comment added successfully !", comment.getId());
        return comment;


    }



    @Override
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> getCommentsByUser(Optional<User> user) {
        return commentRepository.findByUser(user);
    }

    @Override
    public void deleteComment(int id) {
         this.commentRepository.deleteById(id);
    }

}
