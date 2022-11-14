package design.ultimate_quizz.security.dto.history;

import design.ultimate_quizz.entities.History;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryResponse {

    private History history;

}
