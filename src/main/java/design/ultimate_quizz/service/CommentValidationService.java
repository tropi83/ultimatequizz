package design.ultimate_quizz.service;

import design.ultimate_quizz.exceptions.history.HistoryException;
import design.ultimate_quizz.exceptions.quizz.QuizzException;
import design.ultimate_quizz.repository.UserRepository;
import design.ultimate_quizz.security.dto.comment.CommentRequest;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import design.ultimate_quizz.utils.ExceptionMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentValidationService {

    private static final String USER_NOT_FOUND = "user_id_not_found";
    private static final String COMMENT_TEXT_TO0_LONG = "comment_text_too_long";


    private final UserRepository userRepository;

    private final ExceptionMessageAccessor exceptionMessageAccessor;


    private void checkUserExist(int userId) {

        final boolean existsUserById = userRepository.existsById(userId);

        if (!existsUserById) {

            log.warn("{} User not found with this id !", userId);
            final String userNotExist = exceptionMessageAccessor.getMessage(null, USER_NOT_FOUND);

            throw new HistoryException(userNotExist);
        }
    }


    public void validateComment(CommentRequest commentRequest) {

        final String commentText = commentRequest.getText();
        final String commentCreationDate = commentRequest.getCreationDate();
        final int userId = commentRequest.getUser_id();
        checkUserExist(userId);

        checkCommentTextLength(commentText);
    }

    private void checkCommentTextLength(String commentText) {

        if (commentText.length() > 1024) {
            log.warn("{} comment text is too long ! 1024 characters max", commentText);
            final String messageTooLong = exceptionMessageAccessor.getMessage(null, COMMENT_TEXT_TO0_LONG);

            throw new QuizzException(messageTooLong);
        }
    }

}
