package design.ultimate_quizz.security.dto.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;


@Getter
@Setter
@NoArgsConstructor
public class JwtRequest {

	@NotEmpty(message = "{check_auth_token_not_empty}")
	private String token;

}
