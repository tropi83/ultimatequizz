package design.ultimate_quizz.service;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.exceptions.answer.AnswerException;
import design.ultimate_quizz.repository.QuestionRepository;
import design.ultimate_quizz.security.dto.answer.AnswerRequest;
import design.ultimate_quizz.utils.ExceptionMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class AnswerValidationService {

	private static final String ANSWER_LABEL_TOO_LONG = "answer_label_too_long";
	private static final String QUESTION_NOT_FOUND = "answer_question_id_not_found";
	private static final String QUESTION_TOO_MANY_ANSWERS = "answer_question_too_many_answers";
	private static final String QUESTION_ALREADY_TRUE_ANSWER = "answer_question_already_true";

	private final ExceptionMessageAccessor exceptionMessageAccessor;

	private final QuestionRepository questionRepository;

	public void validateAnswer(AnswerRequest answerRequest) {

		final String answerLabel = answerRequest.getLabel();

		checkAnswerLabelLength(answerLabel);

		final int questionId = answerRequest.getQuestion_id();

		checkQuestionExist(questionId);

		checkQuestionNbAnswers(questionId);

		checkAlreadyTrueAnswer(questionId, answerRequest.getIsCorrect());
	}

	public void validatePutAnswer(AnswerRequest answerRequest) {

		final String answerLabel = answerRequest.getLabel();

		checkAnswerLabelLength(answerLabel);

		final int questionId = answerRequest.getQuestion_id();

		checkQuestionExist(questionId);

	}

	private void checkQuestionExist(int questionId) {

		final boolean existsQuestionById = questionRepository.existsById(questionId);

		if (!existsQuestionById) {

			log.warn("{} question_id :Question not found with this id !", questionId);
			final String messageQuestionNotExist = exceptionMessageAccessor.getMessage(null, QUESTION_NOT_FOUND);

			throw new AnswerException(messageQuestionNotExist);
		}
	}

	private void checkQuestionNbAnswers(int questionId) {

		final Optional<Question> existQuestion = questionRepository.findById(questionId);

		if (existQuestion.isPresent()) {
			final Question question = existQuestion.get();

			if(question.getAnswers().size() > 4){
				log.warn("{} question_id :The question already has 4 answers, please delete one !", questionId);
				final String messageTooManyAnswers = exceptionMessageAccessor.getMessage(null, QUESTION_TOO_MANY_ANSWERS);

				throw new AnswerException(messageTooManyAnswers);
			}
		}
	}

	private void checkAlreadyTrueAnswer(int questionId, boolean isCorrectAnswer) {

		if(isCorrectAnswer){
			final Optional<Question> existQuestion = questionRepository.findById(questionId);

			if (existQuestion.isPresent()) {
				final Question question = existQuestion.get();

				boolean thereIsAlreadyTrueAnswer = false;
				for (Answer answer : question.getAnswers()) {
					if (answer.getCorrect()){
						thereIsAlreadyTrueAnswer = true;
					}
				}
				if(thereIsAlreadyTrueAnswer){
					log.warn("{} question_id :There is already an answer 'true', please delete it !", questionId);
					final String messageAlreadyTrueAnswer = exceptionMessageAccessor.getMessage(null, QUESTION_ALREADY_TRUE_ANSWER);

					throw new AnswerException(messageAlreadyTrueAnswer);
				}

			}
		}

	}

	private void checkAnswerLabelLength(String questionLabel) {

		if (questionLabel.length() > 254) {
			log.warn("{} label is too long ! 255 characters max", questionLabel);
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, ANSWER_LABEL_TOO_LONG);

			throw new AnswerException(messageTooLong);
		}
	}

}
