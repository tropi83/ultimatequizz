package design.ultimate_quizz.security.dto.quizz;

import design.ultimate_quizz.entities.Quizz;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizzResponse {

    private Quizz quizz;

}
