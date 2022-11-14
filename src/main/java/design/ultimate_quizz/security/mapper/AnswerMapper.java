package design.ultimate_quizz.security.mapper;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.security.dto.answer.AnswerRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {

	AnswerMapper INSTANCE = Mappers.getMapper(AnswerMapper.class);

	Answer convertToAnswer(AnswerRequest answerRequest);

}
