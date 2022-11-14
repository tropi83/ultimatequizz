package design.ultimate_quizz.exceptions.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class JwtTokenException extends RuntimeException {

	private final String errorMessage;

}
