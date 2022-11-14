package design.ultimate_quizz.security.dto.question;

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
public class QuestionRequest {

    @NotEmpty(message = "{question_label_not_empty}")
    private String label;

    @NotNull(message = "{question_quizz_id_not_empty}")
    private int quizz_id;

    @NotNull(message = "{question_answers_not_empty}")
    private List<Answer> answers;

}
