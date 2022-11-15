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
    @Min(value = 1, message = "{comment_user_id_not_empty")
    private int user_id;

    @NotEmpty(message = "{comment_creation_date_not_empty")
    private String creationDate;

    @NotEmpty(message = "{comment_text_not_empty")
    private String text;

}
