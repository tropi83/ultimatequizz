package design.ultimate_quizz.exceptions.question;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class QuestionException extends RuntimeException {

	private final String errorMessage;

}
