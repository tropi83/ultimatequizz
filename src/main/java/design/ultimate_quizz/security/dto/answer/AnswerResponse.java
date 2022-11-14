package design.ultimate_quizz.security.dto.answer;

import design.ultimate_quizz.entities.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {

    private Answer answer;

}
