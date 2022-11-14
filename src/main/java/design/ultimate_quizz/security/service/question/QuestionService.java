package design.ultimate_quizz.security.service.question;

import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.security.dto.question.QuestionRequest;
import design.ultimate_quizz.security.dto.question.QuestionResponse;

import java.util.List;
import java.util.Optional;

public interface QuestionService {

	Question addQuestion(QuestionRequest questionRequest);

	QuestionResponse updateQuestion(int id, QuestionRequest questionRequest);

	List<Question> getQuestions();

	List<Question> getQuestionsByQuizz(Optional<Quizz> quizz);

	Optional<Question> getQuestionById(int id);

	void deleteQuestion(int id);
	
}
