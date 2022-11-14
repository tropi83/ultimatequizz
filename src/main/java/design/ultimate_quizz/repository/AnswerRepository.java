package design.ultimate_quizz.repository;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    public boolean existsByLabel(String label);

    List<Answer> findByQuestion(Optional<Question> question);
}

