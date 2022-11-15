package design.ultimate_quizz.security.dto.history;

import design.ultimate_quizz.entities.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class HistoryRequest {

    @Min(value = 1, message = "{history_quizz_id_not_empty}")
    private int quizz_id;

    @Min(value = 1, message = "{history_user_id_not_empty}")
    private int user_id;

    @Min(value = -9999, message = "{history_points_not_empty}")
    private int points;

    @Min(value = 0, message = "{history_time_not_empty}")
    private float time;

}
