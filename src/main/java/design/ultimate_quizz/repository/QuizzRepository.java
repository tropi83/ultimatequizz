package design.ultimate_quizz.repository;

import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;


public interface QuizzRepository extends JpaRepository<Quizz, Integer> {

    public boolean existsByName(String name);

    List<Quizz> findByTheme(Optional<Theme> theme);

    List<Quizz> findAllByOrderByCreationDateAsc();

    List<Quizz> findAllByOrderByCreationDateDesc();
}

