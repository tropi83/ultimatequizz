package design.ultimate_quizz.security.service.theme;

import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.repository.ThemeRepository;
import design.ultimate_quizz.security.dto.theme.ThemeRequest;
import design.ultimate_quizz.security.dto.theme.ThemeResponse;
import design.ultimate_quizz.security.mapper.ThemeMapper;
import design.ultimate_quizz.service.ThemeValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class ThemeServiceImpl implements ThemeService {

	private final ThemeRepository themeRepository;

	private final ThemeValidationService themeValidationService;

	@Override
	public ThemeResponse addTheme(ThemeRequest themeRequest) {

		themeValidationService.validateTheme(themeRequest);

		final String themeName = themeRequest.getName();
		final Theme theme = new Theme(themeName);

		themeRepository.save(theme);

		log.info("{} theme added successfully !", theme.getId());

		return new ThemeResponse(theme);
	}

	@Override
	public ThemeResponse updateTheme(int id, ThemeRequest themeRequest) {

		themeValidationService.validatePutTheme(id, themeRequest);

		final String themeName = themeRequest.getName();
		final Optional<Theme> existTheme = getThemeById(id);
		final Theme theme = ThemeMapper.INSTANCE.convertToTheme(themeRequest);

		if (existTheme.isPresent()) {
			theme.setId(id);
			theme.setName(themeName);
			themeRepository.save(theme);
			log.info("{} theme updated successfully !", theme.getId());
		}

		return new ThemeResponse(theme);

	}

	@Override
	public List<Theme> getThemes() {

		return themeRepository.findAll();
	}

	@Override
	public Optional<Theme> getThemeById(int id) {

		return themeRepository.findById(id);
	}

	@Override
	public void deleteTheme(int id) {

		this.themeRepository.deleteById(id);
	}

}
