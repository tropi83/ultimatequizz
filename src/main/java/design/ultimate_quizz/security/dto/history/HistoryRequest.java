package design.ultimate_quizz.security.dto.history;

import design.ultimate_quizz.entities.Question;
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
public class HistoryRequest {

    @NotEmpty(message = "{history_quizz_id_not_empty}")
    private int quizz_id;

    @NotNull(message = "{history_user_id_not_empty}")
    private int user_id;

    @NotNull(message = "{history_point_not_empty}")
    private int point;

}
