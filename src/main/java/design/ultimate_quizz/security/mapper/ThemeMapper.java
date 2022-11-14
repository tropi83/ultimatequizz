package design.ultimate_quizz.security.mapper;

import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.security.dto.theme.ThemeRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ThemeMapper {

	ThemeMapper INSTANCE = Mappers.getMapper(ThemeMapper.class);

	Theme convertToTheme(ThemeRequest themeRequest);

}
