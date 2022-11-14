package design.ultimate_quizz.service;

import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.exceptions.theme.ThemeException;
import design.ultimate_quizz.repository.ThemeRepository;
import design.ultimate_quizz.security.dto.theme.ThemeRequest;
import design.ultimate_quizz.utils.ExceptionMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class ThemeValidationService {

	private static final String THEME_ALREADY_EXISTS = "theme_already_exists";
	private static final String THEME_NAME_TOO_LONG = "theme_name_too_long";

	private final ThemeRepository themeRepository;

	private final ExceptionMessageAccessor exceptionMessageAccessor;

	public void validateTheme(ThemeRequest themeRequest) {

		final String themeName = themeRequest.getName();
		checkThemeNameLength(themeName);
		checkThemeNameExist(themeName);
	}

	public void validatePutTheme(int id, ThemeRequest themeRequest) {

		final String themeName = themeRequest.getName();
		checkThemeNameLength(themeName);

		checkThemePutNameExist(id, themeRequest);
	}

	private void checkThemeNameExist(String name) {

		final boolean existsByName = themeRepository.existsByName(name);

		if (existsByName) {

			log.warn("{} name is already being used !", name);
			final String existsName = exceptionMessageAccessor.getMessage(null, THEME_ALREADY_EXISTS);

			throw new ThemeException(existsName);
		}
	}

	private void checkThemePutNameExist(int id, ThemeRequest themeRequest) {

		final String themeName = themeRequest.getName();
		final boolean existsByName = themeRepository.existsByName(themeName);
		final Optional<Theme> existTheme = themeRepository.findById(id);

		if (existTheme.isPresent()) {
			final Theme theme = existTheme.get();

			if(!theme.getName().equals(themeName) && existsByName) {
				log.warn("{} name is already being used !", themeName);
				final String existsName = exceptionMessageAccessor.getMessage(null, THEME_ALREADY_EXISTS);

				throw new ThemeException(existsName);
			}

		}
	}

	private void checkThemeNameLength(String themeName) {

		if (themeName.length() > 254) {
			log.warn("{} name is too long ! 255 characters max", themeName);
			final String messageTooLong = exceptionMessageAccessor.getMessage(null, THEME_NAME_TOO_LONG);

			throw new ThemeException(messageTooLong);
		}
	}

}
