package design.ultimate_quizz.service;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.exceptions.quizz.QuizzException;
import design.ultimate_quizz.repository.QuizzRepository;
import design.ultimate_quizz.repository.ThemeRepository;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import design.ultimate_quizz.utils.ExceptionMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class QuizzValidationService {

	private static final String QUIZZ_ALREADY_EXISTS = "quizz_name_already_exists";
	private static final String QUIZZ_NAME_TO0_LONG = "quizz_name_too_long";
	private static final String QUIZZ_DESCRIPTION_TO0_LONG = "quizz_description_too_long";
	private static final String QUIZZ_QUESTIONS_TOO_LONG = "quizz_questions_too_long";
	private static final String QUIZZ_QUESTIONS_TOO_SHORT = "quizz_questions_too_short";
	private static final String THEME_NOT_FOUND = "quizz_theme_id_not_found";
	private static final String QUESTION_TOO_MANY_ANSWERS = "question_answer_too_many_answers";
	private static final String QUESTION_NOT_ENOUGH_ANSWERS = "question_answer_not_enough_answers";
	private static final String QUESTION_ALREADY_TRUE_ANSWER_POST = "question_answer_already_true_post";

	private final QuizzRepository quizzRepository;
	private final ThemeRepository themeRepository;
	private final ExceptionMessageAccessor exceptionMessageAccessor;

	public void validateQuizz(QuizzRequest quizzRequest) {

		final String quizzName = quizzRequest.getName();
		final String quizzDescription = quizzRequest.getDescription();
		final int themeId = quizzRequest.getTheme_id();

		checkQuizzNameLength(quizzName);
		checkQuizzDescriptionLength(quizzDescription);
		checkQuizzNameExist(quizzName);
		checkQuizzQuestionNumber(quizzRequest);
		checkThemeExist(themeId);
		checkQuestionNbAnswers(quizzRequest);
		checkAlreadyTrueAnswer(quizzRequest);

	}

	public void validatePutQuizz(int id, QuizzRequest quizzRequest) {

		final String quizzName = quizzRequest.getName();
		final String quizzDescription = quizzRequest.getDescription();
		final int themeId = quizzRequest.getTheme_id();

		checkQuizzNameLength(quizzName);
		checkQuizzDescriptionLength(quizzDescription);
		checkQuizzQuestionNumber(quizzRequest);
		checkQuizzPutNameExist(id, quizzRequest);
		checkThemeExist(themeId);
	}

	private void checkQuizzNameExist(String name) {

		final boolean existsByName = quizzRepository.existsByName(name);

		if (existsByName) {

			log.warn("{} quizz name is already being used !", name);
			final String existsName = exceptionMessageAccessor.getMessage(null, QUIZZ_ALREADY_EXISTS);

			throw new QuizzException(existsName);
		}
	}

	private void checkThemeExist(int themeId) {

		final boolean existsThemeById = themeRepository.existsById(themeId);

		if (!existsThemeById) {

			log.warn("{} Theme not found with this id !", themeId);
			final String themeNotExist = exceptionMessageAccessor.getMessage(null, THEME_NOT_FOUND);

			throw new QuizzException(themeNotExist);
		}
	}

	private void checkQuizzPutNameExist(int id, QuizzRequest quizzRequest) {

		final String quizzName = quizzRequest.getName();

		final boolean existsByName = quizzRepository.existsByName(quizzName);
		final Optional<Quizz> existQuizz = quizzRepository.findById(id);

		if (existQuizz.isPresent()) {
			final Quizz quizz = existQuizz.get();

			if(!quizz.getName().equals(quizzName) && existsByName) {
				log.warn("{} quizz name is already being used !", quizzName);
				final String existsName = exceptionMessageAccessor.getMessage(null, QUIZZ_ALREADY_EXISTS);

				throw new QuizzException(existsName);
			}

		}
	}

	private void checkQuizzNameLength(String quizzName) {

		if (quizzName.length() > 254) {
			log.warn("{} quizz name is too long ! 255 characters max", quizzName);
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, QUIZZ_NAME_TO0_LONG);

			throw new QuizzException(messageTooLong);
		}
	}

	private void checkQuizzDescriptionLength(String quizzDescription) {

		if (quizzDescription.length() > 1024) {
			log.warn("{} quizz description is too long ! 1024 characters max", quizzDescription);
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, QUIZZ_DESCRIPTION_TO0_LONG);

			throw new QuizzException(messageTooLong);
		}
	}

	private void checkQuizzQuestionNumber(QuizzRequest quizzRequest) {

		final List<Question> quizzQuestions = quizzRequest.getQuestions();

		if (quizzQuestions.size() > 20 ) {
			log.warn("{} quizz questions list is too long ! 20 questions max", quizzQuestions);
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, QUIZZ_QUESTIONS_TOO_LONG);

			throw new QuizzException(messageTooLong);
		}

		if (quizzQuestions.size() < 5 ) {
			log.warn("{} quizz questions list is too long ! 5 questions min", quizzQuestions);
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, QUIZZ_QUESTIONS_TOO_SHORT);

			throw new QuizzException(messageTooLong);
		}

	}


	private void checkQuestionNbAnswers(QuizzRequest quizzRequest) {

		for (Question question : quizzRequest.getQuestions()) {

			if(question.getAnswers().size() > 4){

				log.warn("{}", question.getAnswers());
				log.warn("The question already has 4 answers, please delete one !");
				final String messageTooManyAnswers = exceptionMessageAccessor.getMessage(null, QUESTION_TOO_MANY_ANSWERS);

				throw new QuizzException(messageTooManyAnswers);
			}

			if(question.getAnswers().size() < 2){
				log.warn("There are at least two answers to the question");
				final String messageNotEnoughAnswers = exceptionMessageAccessor.getMessage(null, QUESTION_NOT_ENOUGH_ANSWERS);

				throw new QuizzException(messageNotEnoughAnswers);
			}

		}

	}

	private void checkAlreadyTrueAnswer(QuizzRequest quizzRequest) {

		for (Question question : quizzRequest.getQuestions()) {
			int trueAnswerCounter = 0;
			for (Answer answer : question.getAnswers()) {
				if (answer.getIsCorrect()){
					trueAnswerCounter = trueAnswerCounter + 1;
				}
			}

			if(trueAnswerCounter != 1){
				log.warn("There can be only one 'true' answer !");
				final String messageAlreadyTrueAnswer = exceptionMessageAccessor.getMessage(null, QUESTION_ALREADY_TRUE_ANSWER_POST);

				throw new QuizzException(messageAlreadyTrueAnswer);
			}
		}

	}

}
