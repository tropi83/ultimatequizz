package design.ultimate_quizz.security.mapper;

import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuizzMapper {

	QuizzMapper INSTANCE = Mappers.getMapper(QuizzMapper.class);

	Quizz convertToQuizz(QuizzRequest quizzRequest);

}
