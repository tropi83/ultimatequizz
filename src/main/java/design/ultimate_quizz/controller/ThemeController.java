package design.ultimate_quizz.controller;

import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.security.dto.theme.ThemeRequest;
import design.ultimate_quizz.security.dto.theme.ThemeResponse;
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
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    @GetMapping("themes/{id}")
    public ResponseEntity<Theme> getTheme(@PathVariable("id") int id)
    {
        Optional<Theme> theme = this.themeService.getThemeById(id);

        return theme.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("themes")
    public List<Theme> getThemes() {

        return this.themeService.getThemes();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("themes")
    public ResponseEntity<ThemeResponse> addTheme(@Valid @RequestBody ThemeRequest themeRequest) {

        final ThemeResponse themeResponse = themeService.addTheme(themeRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(themeResponse);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("themes/{id}")
    public ResponseEntity<ThemeResponse> updateTheme(
            @Valid
            @PathVariable("id") int id,
            @RequestBody ThemeRequest themeRequest
    )  {

        Optional<Theme> existTheme = themeService.getThemeById(id);
        if (existTheme.isPresent()) {
            final ThemeResponse themeResponse = themeService.updateTheme(id, themeRequest);

            return ResponseEntity.status(HttpStatus.OK).body(themeResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("themes/{id}")
    public void deleteTheme(@PathVariable("id") int id) {

        this.themeService.deleteTheme(id);
    }

}
