package design.ultimate_quizz.exceptions.history;

import design.ultimate_quizz.controller.HistoryController;
import design.ultimate_quizz.exceptions.ApiExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;


@RestControllerAdvice(basePackageClasses = HistoryController.class)
public class HistoryControllerAdvice {

	@ExceptionHandler(HistoryException.class)
	ResponseEntity<ApiExceptionResponse> handleAddUpdateException(HistoryException exception) {

		final ApiExceptionResponse response = new ApiExceptionResponse(exception.getErrorMessage(), HttpStatus.BAD_REQUEST, LocalDateTime.now());

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
