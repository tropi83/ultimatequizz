package design.ultimate_quizz.exceptions.answer;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class AnswerException extends RuntimeException {

	private final String errorMessage;

}
