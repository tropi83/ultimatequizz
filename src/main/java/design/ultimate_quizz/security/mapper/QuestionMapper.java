package design.ultimate_quizz.security.mapper;

import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.security.dto.question.QuestionRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

	QuestionMapper INSTANCE = Mappers.getMapper(QuestionMapper.class);

	Question convertToQuestion(QuestionRequest questionRequest);

}
