package design.ultimate_quizz.security.service.theme;

import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.security.dto.theme.ThemeRequest;
import design.ultimate_quizz.security.dto.theme.ThemeResponse;
import java.util.List;
import java.util.Optional;

public interface ThemeService {

	ThemeResponse addTheme(ThemeRequest themeRequest);

	ThemeResponse updateTheme(int id, ThemeRequest themeRequest);

	List<Theme> getThemes();

	Optional<Theme> getThemeById(int id);

	void deleteTheme(int id);

}
