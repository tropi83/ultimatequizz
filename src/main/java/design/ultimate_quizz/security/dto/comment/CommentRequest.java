package design.ultimate_quizz.security.dto.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CommentRequest {

    @NotEmpty(message = "{comment_text_not_empty")
    private String text;

    @Min(value = 1, message = "{comment_quizz_id_not_empty")
    private int quizz_id;

    @Min(value = 1, message = "{comment_user_id_not_empty")
    private int user_id;

}
