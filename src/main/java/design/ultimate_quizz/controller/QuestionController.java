package design.ultimate_quizz.controller;

import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.security.dto.question.QuestionRequest;
import design.ultimate_quizz.security.dto.question.QuestionResponse;
import design.ultimate_quizz.security.service.question.QuestionService;
import design.ultimate_quizz.security.service.quizz.QuizzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizzService quizzService;

    @GetMapping("questions/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable("id") int id)
    {
        Optional<Question> question = this.questionService.getQuestionById(id);

        return question.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("questions")
    public List<Question> getQuestions() {

        return this.questionService.getQuestions();
    }

    @GetMapping("questions/quizz/{id}")
    public ResponseEntity<List<Question>> getQuestionsByQuizz(@PathVariable("id") int id) {

        Optional<Quizz> existQuizz = quizzService.getQuizzById(id);
        if (existQuizz.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(this.questionService.getQuestionsByQuizz(existQuizz));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("questions")
    public ResponseEntity<Question> addQuestion(@Valid @RequestBody QuestionRequest questionRequest) {

        final Question questionResponse = questionService.addQuestion(questionRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(questionResponse);
    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("questions/{id}")
    public ResponseEntity<QuestionResponse> updateQuestion(
            @Valid
            @PathVariable("id") int id,
            @RequestBody QuestionRequest questionRequest
    )  {

        Optional<Question> existQuestion = questionService.getQuestionById(id);
        if (existQuestion.isPresent()) {
            final QuestionResponse questionResponse = questionService.updateQuestion(id, questionRequest);

            return ResponseEntity.status(HttpStatus.OK).body(questionResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("questions/{id}")
    public void deleteQuestion(@PathVariable("id") int id) {

        this.questionService.deleteQuestion(id);
    }

}
