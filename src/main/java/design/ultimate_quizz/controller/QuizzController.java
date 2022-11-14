package design.ultimate_quizz.controller;

import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import design.ultimate_quizz.security.dto.quizz.QuizzResponse;
import design.ultimate_quizz.security.service.quizz.QuizzService;
import design.ultimate_quizz.security.service.theme.ThemeService;
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
public class QuizzController {

    @Autowired
    private QuizzService quizzService;

    @Autowired
    private ThemeService themeService;

    @GetMapping("quizzs/{id}")
    public ResponseEntity<Quizz> getQuizz(@PathVariable("id") int id)
    {
        Optional<Quizz> quizz = this.quizzService.getQuizzById(id);

        return quizz.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("quizzs")
    public List<Quizz> getQuizzs() {

        return this.quizzService.getQuizzs();
    }

    @GetMapping("quizzs/asc")
    public List<Quizz> getQuizzsAsc() {

        return this.quizzService.getQuizzsAsc();
    }

    @GetMapping("quizzs/desc")
    public List<Quizz> getQuizzsDesc() {

        return this.quizzService.getQuizzsDesc();
    }

    @GetMapping("quizzs/theme/{id}")
    public ResponseEntity<List<Quizz>> getQuizzsByTheme(@PathVariable("id") int id) {

        Optional<Theme> existTheme = themeService.getThemeById(id);
        if (existTheme.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(this.quizzService.getQuizzsByTheme(existTheme));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("quizzs")
    public ResponseEntity<Quizz> addQuizz(@Valid @RequestBody QuizzRequest quizzRequest) {

        final Quizz quizzResponse = quizzService.addQuizz(quizzRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(quizzResponse);
    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("quizzs/{id}")
    public ResponseEntity<QuizzResponse> updateQuizz(
            @Valid
            @PathVariable("id") int id,
            @RequestBody QuizzRequest quizzRequest
    )  {

        Optional<Quizz> existQuizz = quizzService.getQuizzById(id);
        if (existQuizz.isPresent()) {
            final QuizzResponse quizzResponse = quizzService.updateQuizz(id, quizzRequest);

            return ResponseEntity.status(HttpStatus.OK).body(quizzResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("quizzs/{id}")
    public void deleteQuizz(@PathVariable("id") int id) {

        this.quizzService.deleteQuizz(id);
    }

}
