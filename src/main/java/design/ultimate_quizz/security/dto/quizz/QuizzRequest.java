package design.ultimate_quizz.security.dto.quizz;

import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Theme;
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
public class QuizzRequest {

    @NotEmpty(message = "{quizz_name_not_empty}")
    private String name;

    @NotNull(message = "{quizz_description_not_empty}")
    private String description;

    @NotNull(message = "{quizz_is_active_not_empty}")
    private Boolean isActive;

    @NotNull(message = "{quizz_theme_id_not_empty}")
    private int theme_id;

    @NotNull(message = "{quizz_questions_not_empty}")
    private List<Question> questions;

}
