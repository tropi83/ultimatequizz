package design.ultimate_quizz.exceptions.history;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class HistoryException extends RuntimeException {

	private final String errorMessage;

}
