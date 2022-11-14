package design.ultimate_quizz.exceptions.theme;

import design.ultimate_quizz.controller.ThemeController;
import design.ultimate_quizz.exceptions.ApiExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;


@RestControllerAdvice(basePackageClasses = ThemeController.class)
public class ThemeControllerAdvice {

	@ExceptionHandler(ThemeException.class)
	ResponseEntity<ApiExceptionResponse> handleAddUpdateException(ThemeException exception) {

		final ApiExceptionResponse response = new ApiExceptionResponse(exception.getErrorMessage(), HttpStatus.BAD_REQUEST, LocalDateTime.now());

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
