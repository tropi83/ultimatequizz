package design.ultimate_quizz.repository;

import design.ultimate_quizz.entities.Comment;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    public boolean existsById(int id);

    List<Comment> findByUser(Optional<User> user);

    List<Comment> findAllByOrderByCreationDateAsc();

    List<Comment> findAllByOrderByCreationDateDesc();


}
