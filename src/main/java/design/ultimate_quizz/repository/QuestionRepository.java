package design.ultimate_quizz.repository;

import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Quizz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question, Integer> {

    public boolean existsByLabel(String label);

    List<Question> findByQuizz(Optional<Quizz> quizz);
}

