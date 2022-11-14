package design.ultimate_quizz.security.service.answer;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.security.dto.answer.AnswerRequest;
import design.ultimate_quizz.security.dto.answer.AnswerResponse;

import java.util.List;
import java.util.Optional;

public interface AnswerService {

	Answer addAnswer(AnswerRequest answerRequest);

	AnswerResponse updateAnswer(int id, AnswerRequest answerRequest);

	List<Answer> getAnswers();

	List<Answer> getAnswersByQuestion(Optional<Question> question);

	Optional<Answer> getAnswerById(int id);

	void deleteAnswer(int id);
	
}
