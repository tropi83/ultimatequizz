package design.ultimate_quizz.service;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.exceptions.history.HistoryException;
import design.ultimate_quizz.exceptions.quizz.QuizzException;
import design.ultimate_quizz.repository.QuizzRepository;
import design.ultimate_quizz.repository.ThemeRepository;
import design.ultimate_quizz.repository.UserRepository;
import design.ultimate_quizz.security.dto.history.HistoryRequest;
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
public class HistoryValidationService {

	private static final String QUIZZ_NOT_FOUND = "quizz_id_not_found";

	private static final String USER_NOT_FOUND = "user_id_not_found";


	private final QuizzRepository quizzRepository;
	private final UserRepository userRepository;
	private final ExceptionMessageAccessor exceptionMessageAccessor;

	public void validateHistory(HistoryRequest historyRequest) {

		final int quizzId = historyRequest.getQuizz_id();
		final int userId = historyRequest.getUser_id();

		checkQuizzExist(quizzId);
		checkUserExist(userId);

	}


	private void checkQuizzExist(int quizzId) {

		final boolean existsQuizzById = quizzRepository.existsById(quizzId);

		if (!existsQuizzById) {

			log.warn("{} Quizz not found with this id !", quizzId);
			final String quizzNotExist = exceptionMessageAccessor.getMessage(null, QUIZZ_NOT_FOUND);

			throw new HistoryException(quizzNotExist);
		}
	}

	private void checkUserExist(int userId) {

		final boolean existsUserById = userRepository.existsById(userId);

		if (!existsUserById) {

			log.warn("{} User not found with this id !", userId);
			final String userNotExist = exceptionMessageAccessor.getMessage(null, USER_NOT_FOUND);

			throw new HistoryException(userNotExist);
		}
	}

}
