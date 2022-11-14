package design.ultimate_quizz.exceptions.question;

import design.ultimate_quizz.controller.QuestionController;
import design.ultimate_quizz.exceptions.ApiExceptionResponse;
import design.ultimate_quizz.exceptions.question.QuestionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;


@RestControllerAdvice(basePackageClasses = QuestionController.class)
public class QuestionControllerAdvice {

	@ExceptionHandler(QuestionException.class)
	ResponseEntity<ApiExceptionResponse> handleAddUpdateException(QuestionException exception) {

		final ApiExceptionResponse response = new ApiExceptionResponse(exception.getErrorMessage(), HttpStatus.BAD_REQUEST, LocalDateTime.now());

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
