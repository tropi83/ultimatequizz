package design.ultimate_quizz.controller;

import design.ultimate_quizz.entities.History;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.security.dto.history.HistoryRequest;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import design.ultimate_quizz.security.service.history.HistoryService;
import design.ultimate_quizz.security.service.quizz.QuizzService;
import design.ultimate_quizz.security.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @Autowired
    private UserService userService;

    @Autowired
    private QuizzService quizzService;

    @GetMapping("histories/{id}")
    public ResponseEntity<History> getHistory(@PathVariable("id") int id)
    {
        Optional<History> history = this.historyService.getHistoryById(id);

        return history.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("histories")
    public List<History> getHistories() {
        return this.historyService.getHistories();
    }

    @GetMapping("histories/user/{id}")
    public ResponseEntity<List<History>> getHistoryByUser(@PathVariable("id") int id) {
        Optional<User> existUser = userService.getUserById(id);
        if (existUser.isPresent())
        {
            return ResponseEntity.status(HttpStatus.OK).body(this.historyService.getHistoriesByUser(existUser));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    //@PreAuthorize("hasAuthority('USER')")
    @PostMapping("histories")
    public ResponseEntity<History> addHistory(@Valid @RequestBody HistoryRequest historyRequest) {

        final History historyResponse = historyService.addHistory(historyRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(historyResponse);
    }

}
