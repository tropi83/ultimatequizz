package design.ultimate_quizz.security.service.user;

import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.security.dto.auth.AuthenticatedUserDto;
import design.ultimate_quizz.security.dto.auth.RegistrationRequest;
import design.ultimate_quizz.security.dto.auth.RegistrationResponse;

import java.util.List;
import java.util.Optional;


public interface UserService {

	List<User> getUsers();

	User findByUsername(String username);

	RegistrationResponse registration(RegistrationRequest registrationRequest);

	AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

	Optional<User> getUserById(int id);

}
