package design.ultimate_quizz.security.service.user;

import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.entities.UserRole;
import design.ultimate_quizz.repository.UserRepository;
import design.ultimate_quizz.security.dto.auth.AuthenticatedUserDto;
import design.ultimate_quizz.security.dto.auth.RegistrationRequest;
import design.ultimate_quizz.security.dto.auth.RegistrationResponse;
import design.ultimate_quizz.security.mapper.UserMapper;
import design.ultimate_quizz.service.UserValidationService;
import design.ultimate_quizz.utils.GeneralMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private static final String REGISTRATION_SUCCESSFUL = "registration_successful";

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	private final UserValidationService userValidationService;

	private final GeneralMessageAccessor generalMessageAccessor;

	@Override
	public List<User> getUsers(){
		return userRepository.findAll();
	}

	@Override
	public User findByUsername(String username) {

		return userRepository.findByUsername(username);
	}

	@Override
	public RegistrationResponse registration(RegistrationRequest registrationRequest) {

		userValidationService.validateUser(registrationRequest);

		final User user = UserMapper.INSTANCE.convertToUser(registrationRequest);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setUserRole(UserRole.USER);
		user.setCreationDate(LocalDate.now());

		userRepository.save(user);

		final String username = registrationRequest.getUsername();
		final String registrationSuccessMessage = generalMessageAccessor.getMessage(null, REGISTRATION_SUCCESSFUL, username);

		log.info("{} registered successfully !", username);

		return new RegistrationResponse(registrationSuccessMessage);
	}

	@Override
	public AuthenticatedUserDto findAuthenticatedUserByUsername(String username) {

		final User user = findByUsername(username);

		return UserMapper.INSTANCE.convertToAuthenticatedUserDto(user);
	}

	@Override
	public Optional<User> getUserById(int id) {
		return userRepository.findById(id);
	}

}
