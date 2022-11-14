package design.ultimate_quizz.exceptions.theme;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class ThemeException extends RuntimeException {

	private final String errorMessage;

}
