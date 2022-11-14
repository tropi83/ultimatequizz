package design.ultimate_quizz.security.jwt;

import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.exceptions.auth.JwtTokenException;
import design.ultimate_quizz.security.dto.auth.AuthenticatedUserDto;
import design.ultimate_quizz.security.dto.auth.JwtRequest;
import design.ultimate_quizz.security.dto.auth.LoginRequest;
import design.ultimate_quizz.security.dto.auth.LoginResponse;
import design.ultimate_quizz.security.mapper.UserMapper;
import design.ultimate_quizz.security.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenService {

	private static final String USERNAME_OR_PASSWORD_INVALID = "Invalid username or password.";
	private static final String JWT_TOKEN_INVALID = "Invalid JWT Token";

	private final UserService userService;

	private final JwtTokenManager jwtTokenManager;

	private final AuthenticationManager authenticationManager;

	public LoginResponse getLoginResponse(LoginRequest loginRequest) {

		final String username = loginRequest.getUsername();
		final String password = loginRequest.getPassword();

		final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, password);

		authenticationManager.authenticate(usernamePasswordAuthenticationToken);

		final AuthenticatedUserDto authenticatedUserDto = userService.findAuthenticatedUserByUsername(username);

		final User user = UserMapper.INSTANCE.convertToUser(authenticatedUserDto);
		final String token = jwtTokenManager.generateToken(user);

		log.info(" {} has successfully logged in!", user.getUsername());

		return new LoginResponse(token, user);
	}

	public LoginResponse checkAuthenticationResponse(JwtRequest jwtRequest) {

		final String username = jwtTokenManager.getUsernameFromToken(jwtRequest.getToken());

		final AuthenticatedUserDto authenticatedUser = userService.findAuthenticatedUserByUsername(username);
		final User user = UserMapper.INSTANCE.convertToUser(authenticatedUser);
		if (Objects.isNull(authenticatedUser)) {
			throw new UsernameNotFoundException(USERNAME_OR_PASSWORD_INVALID);
		}
		if(!jwtTokenManager.validateToken(jwtRequest.getToken(), username)){

			log.info(" {} check auth error !", userService.findByUsername(username));

			throw new JwtTokenException(JWT_TOKEN_INVALID);

		}

		return new LoginResponse(jwtRequest.getToken(), user);

	 }

}
