package design.ultimate_quizz.exceptions.quizz;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class QuizzException extends RuntimeException {

	private final String errorMessage;

}
