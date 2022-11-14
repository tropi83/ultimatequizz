package design.ultimate_quizz.security.dto.theme;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class ThemeRequest {

    @NotEmpty(message = "{theme_name_not_empty}")
    private String name;

}
