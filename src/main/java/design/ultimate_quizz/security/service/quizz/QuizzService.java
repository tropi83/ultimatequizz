package design.ultimate_quizz.security.service.quizz;

import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import design.ultimate_quizz.security.dto.quizz.QuizzResponse;

import java.util.List;
import java.util.Optional;

public interface QuizzService {

	Quizz addQuizz(QuizzRequest quizzRequest);

	QuizzResponse updateQuizz(int id, QuizzRequest quizzRequest);

	List<Quizz> getQuizzs();
	List<Quizz> getQuizzsAsc();
	List<Quizz> getQuizzsDesc();

	List<Quizz> getQuizzsByTheme(Optional<Theme> theme);

	Optional<Quizz> getQuizzById(int id);

	void deleteQuizz(int id);
	
}
