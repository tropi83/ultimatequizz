package design.ultimate_quizz.service;

import design.ultimate_quizz.exceptions.auth.RegistrationException;
import design.ultimate_quizz.repository.UserRepository;
import design.ultimate_quizz.security.dto.auth.RegistrationRequest;
import design.ultimate_quizz.utils.ExceptionMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserValidationService {

	private static final String EMAIL_ALREADY_EXISTS = "email_already_exists";
	private static final String USERNAME_ALREADY_EXISTS = "username_already_exists";
	private static final String USERNAME_TOO_LONG = "username_too_long";
	private static final String EMAIL_TOO_LONG = "email_too_long";
	private static final String LASTNAME_TOO_LONG = "lastname_too_long";
	private static final String FIRSTNAME_TOO_LONG = "firstname_too_long";
	private static final String PASSWORD_TOO_LONG = "password_too_long";

	private final UserRepository userRepository;

	private final ExceptionMessageAccessor exceptionMessageAccessor;

	public void validateUser(RegistrationRequest registrationRequest) {

		final String email = registrationRequest.getEmail();
		final String username = registrationRequest.getUsername();

		checkLength(registrationRequest);
		checkEmail(email);
		checkUsername(username);
	}

	private void checkUsername(String username) {

		final boolean existsByUsername = userRepository.existsByUsername(username);

		if (existsByUsername) {

			log.warn("{} username is already being used!", username);

			final String existsUsername = exceptionMessageAccessor.getMessage(null, USERNAME_ALREADY_EXISTS);
			throw new RegistrationException(existsUsername);
		}

	}

	private void checkEmail(String email) {

		final boolean existsByEmail = userRepository.existsByEmail(email);

		if (existsByEmail) {

			log.warn("{} email is already being used!", email);

			final String existsEmail = exceptionMessageAccessor.getMessage(null, EMAIL_ALREADY_EXISTS);
			throw new RegistrationException(existsEmail);
		}
	}

	private void checkLength(RegistrationRequest registrationRequest) {

		if (registrationRequest.getEmail().length() > 254) {
			log.warn("{} email is too long ! 255 characters max", registrationRequest.getEmail());
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, EMAIL_TOO_LONG);

			throw new RegistrationException(messageTooLong);
		}

		if (registrationRequest.getUsername().length() > 254) {
			log.warn("{} username is too long ! 255 characters max", registrationRequest.getUsername());
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, USERNAME_TOO_LONG);

			throw new RegistrationException(messageTooLong);
		}

		if (registrationRequest.getLastname().length() > 254) {
			log.warn("{} lastname is too long ! 255 characters max", registrationRequest.getLastname());
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, LASTNAME_TOO_LONG);

			throw new RegistrationException(messageTooLong);
		}

		if (registrationRequest.getFirstname().length() > 254) {
			log.warn("{} firstname is too long ! 255 characters max", registrationRequest.getFirstname());
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, FIRSTNAME_TOO_LONG);

			throw new RegistrationException(messageTooLong);
		}

		if (registrationRequest.getPassword().length() > 254) {
			log.warn("{} password is too long ! 255 characters max", registrationRequest.getPassword());
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, PASSWORD_TOO_LONG);

			throw new RegistrationException(messageTooLong);
		}
	}

}
