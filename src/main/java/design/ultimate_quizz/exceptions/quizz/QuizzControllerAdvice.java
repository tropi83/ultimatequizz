package design.ultimate_quizz.exceptions.quizz;

import design.ultimate_quizz.controller.QuizzController;
import design.ultimate_quizz.exceptions.ApiExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;


@RestControllerAdvice(basePackageClasses = QuizzController.class)
public class QuizzControllerAdvice {

	@ExceptionHandler(QuizzException.class)
	ResponseEntity<ApiExceptionResponse> handleAddUpdateException(QuizzException exception) {

		final ApiExceptionResponse response = new ApiExceptionResponse(exception.getErrorMessage(), HttpStatus.BAD_REQUEST, LocalDateTime.now());

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
