package design.ultimate_quizz.exceptions.comment;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class CommentException extends RuntimeException {

	private final String errorMessage;

}
