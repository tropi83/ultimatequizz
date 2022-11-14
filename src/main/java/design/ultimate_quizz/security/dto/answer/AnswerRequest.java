package design.ultimate_quizz.security.dto.answer;

import design.ultimate_quizz.entities.Answer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class AnswerRequest {

    @NotEmpty(message = "{answer_label_not_empty}")
    private String label;

    @NotNull(message = "{answer_is_correct_not_empty}")
    private Boolean isCorrect;

    @NotNull(message = "{answer_question_id_not_empty}")
    private int question_id;

}
