package design.ultimate_quizz.repository;

import design.ultimate_quizz.entities.History;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Integer> {
    List<History> findAll();

    List<History> findByUser(Optional<User> user);


}
