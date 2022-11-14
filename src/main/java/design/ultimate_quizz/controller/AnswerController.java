package design.ultimate_quizz.controller;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.security.dto.answer.AnswerRequest;
import design.ultimate_quizz.security.dto.answer.AnswerResponse;
import design.ultimate_quizz.security.service.answer.AnswerService;
import design.ultimate_quizz.security.service.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @Qualifier("questionServiceImpl")
    @Autowired
    private QuestionService questionService;

    @GetMapping("answers/{id}")
    public ResponseEntity<Answer> getAnswer(@PathVariable("id") int id)
    {
        Optional<Answer> answer = this.answerService.getAnswerById(id);

        return answer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("answers")
    public List<Answer> getAnswers() {

        return this.answerService.getAnswers();
    }

    @GetMapping("answers/question/{id}")
    public ResponseEntity<List<Answer>> getAnswersByQuestion(@PathVariable("id") int id) {

        Optional<Question> existQuestion = questionService.getQuestionById(id);
        if (existQuestion.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(this.answerService.getAnswersByQuestion(existQuestion));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("answers")
    public ResponseEntity<Answer> addAnswer(@Valid @RequestBody AnswerRequest answerRequest) {

        final Answer answerResponse = answerService.addAnswer(answerRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(answerResponse);
    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("answers/{id}")
    public ResponseEntity<AnswerResponse> updateAnswer(
            @Valid
            @PathVariable("id") int id,
            @RequestBody AnswerRequest answerRequest
    )  {

        Optional<Answer> existAnswer = answerService.getAnswerById(id);
        if (existAnswer.isPresent()) {
            final AnswerResponse answerResponse = answerService.updateAnswer(id, answerRequest);

            return ResponseEntity.status(HttpStatus.OK).body(answerResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("answers/{id}")
    public void deleteAnswer(@PathVariable("id") int id) {

        this.answerService.deleteAnswer(id);
    }

}
