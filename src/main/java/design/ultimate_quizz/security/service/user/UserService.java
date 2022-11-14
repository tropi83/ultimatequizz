package design.ultimate_quizz.security.service.user;

import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.security.dto.auth.AuthenticatedUserDto;
import design.ultimate_quizz.security.dto.auth.RegistrationRequest;
import design.ultimate_quizz.security.dto.auth.RegistrationResponse;


public interface UserService {

	User findByUsername(String username);

	RegistrationResponse registration(RegistrationRequest registrationRequest);

	AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

}
