package design.ultimate_quizz.repository;

import design.ultimate_quizz.entities.Theme;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ThemeRepository extends JpaRepository<Theme, Integer> {

    public boolean existsByName(String name);
}

