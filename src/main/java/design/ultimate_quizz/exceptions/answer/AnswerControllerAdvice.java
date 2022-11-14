package design.ultimate_quizz.exceptions.answer;

import design.ultimate_quizz.controller.AnswerController;
import design.ultimate_quizz.exceptions.ApiExceptionResponse;
import design.ultimate_quizz.exceptions.answer.AnswerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;


@RestControllerAdvice(basePackageClasses = AnswerController.class)
public class AnswerControllerAdvice {

	@ExceptionHandler(AnswerException.class)
	ResponseEntity<ApiExceptionResponse> handleAddUpdateException(AnswerException exception) {

		final ApiExceptionResponse response = new ApiExceptionResponse(exception.getErrorMessage(), HttpStatus.BAD_REQUEST, LocalDateTime.now());

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
