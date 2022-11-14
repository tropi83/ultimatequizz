package design.ultimate_quizz.security.dto.auth;

import design.ultimate_quizz.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

	private String token;

	private User user;

}
