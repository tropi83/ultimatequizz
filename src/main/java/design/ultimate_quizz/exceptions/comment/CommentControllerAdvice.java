package design.ultimate_quizz.exceptions.comment;

import design.ultimate_quizz.controller.CommentController;
import design.ultimate_quizz.exceptions.ApiExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;


@RestControllerAdvice(basePackageClasses = CommentController.class)
public class CommentControllerAdvice {

	@ExceptionHandler(CommentException.class)
	ResponseEntity<ApiExceptionResponse> handleAddUpdateException(CommentException exception) {

		final ApiExceptionResponse response = new ApiExceptionResponse(exception.getErrorMessage(), HttpStatus.BAD_REQUEST, LocalDateTime.now());

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
