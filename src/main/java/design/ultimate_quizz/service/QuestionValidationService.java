package design.ultimate_quizz.service;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.exceptions.question.QuestionException;
import design.ultimate_quizz.repository.QuizzRepository;
import design.ultimate_quizz.security.dto.question.QuestionRequest;
import design.ultimate_quizz.utils.ExceptionMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionValidationService {

	private static final String QUESTION_LABEL_TOO_LONG = "question_label_too_long";
	private static final String QUIZZ_NOT_FOUND = "question_quizz_id_not_found";
	private static final String QUESTION_TOO_MANY_ANSWERS = "question_answer_too_many_answers";
	private static final String QUESTION_NOT_ENOUGH_ANSWERS = "question_answer_not_enough_answers";
	private static final String QUESTION_ALREADY_TRUE_ANSWER_POST = "question_answer_already_true_post";

	private final ExceptionMessageAccessor exceptionMessageAccessor;

	private final QuizzRepository quizzRepository;

	public void validateQuestion(QuestionRequest questionRequest) {

		final String questionLabel = questionRequest.getLabel();

		checkQuestionLabelLength(questionLabel);

		final int quizzId = questionRequest.getQuizz_id();

		checkQuizzExist(quizzId);

		checkQuestionNbAnswers(questionRequest);

		checkAlreadyTrueAnswer(questionRequest);
	}

	public void validatePutQuestion(QuestionRequest questionRequest) {

		final String questionLabel = questionRequest.getLabel();

		checkQuestionLabelLength(questionLabel);

		final int quizzId = questionRequest.getQuizz_id();

		checkQuizzExist(quizzId);

	}

	private void checkQuizzExist(int quizzId) {

		final boolean existsQuizzById = quizzRepository.existsById(quizzId);

		if (!existsQuizzById) {

			log.warn("{} Quizz not found with this id !", quizzId);
			final String quizzNotExist = exceptionMessageAccessor.getMessage(null, QUIZZ_NOT_FOUND);

			throw new QuestionException(quizzNotExist);
		}
	}

	private void checkQuestionLabelLength(String questionLabel) {

		if (questionLabel.length() > 254) {
			log.warn("{} label is too long ! 255 characters max", questionLabel);
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, QUESTION_LABEL_TOO_LONG);

			throw new QuestionException(messageTooLong);
		}
	}

	private void checkQuestionNbAnswers(QuestionRequest questionRequest) {

		if(questionRequest.getAnswers().size() > 4){
			log.warn("The question already has 4 answers, please delete one !");
			final String messageTooManyAnswers = exceptionMessageAccessor.getMessage(null, QUESTION_TOO_MANY_ANSWERS);

			throw new QuestionException(messageTooManyAnswers);
		}

		if(questionRequest.getAnswers().size() < 2){
			log.warn("There are at least two answers to the question");
			final String messageNotEnoughAnswers = exceptionMessageAccessor.getMessage(null, QUESTION_NOT_ENOUGH_ANSWERS);

			throw new QuestionException(messageNotEnoughAnswers);
		}

	}

	private void checkAlreadyTrueAnswer(QuestionRequest questionRequest) {

		int trueAnswerCounter = 0;
		for (Answer answer : questionRequest.getAnswers()) {
			if (answer.getCorrect()){
				trueAnswerCounter = trueAnswerCounter + 1;
			}
		}

		if(trueAnswerCounter != 1){
			log.warn("There can be only one 'true' answer !");
			final String messageAlreadyTrueAnswer = exceptionMessageAccessor.getMessage(null, QUESTION_ALREADY_TRUE_ANSWER_POST);

			throw new QuestionException(messageAlreadyTrueAnswer);
		}

	}

}
