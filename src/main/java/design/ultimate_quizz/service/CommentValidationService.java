package design.ultimate_quizz.service;

import design.ultimate_quizz.exceptions.comment.CommentException;
import design.ultimate_quizz.repository.UserRepository;
import design.ultimate_quizz.security.dto.comment.CommentRequest;
import design.ultimate_quizz.utils.ExceptionMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentValidationService {

    private static final String USER_NOT_FOUND = "user_id_not_found";
    private static final String QUIZZ_NOT_FOUND = "quizz_id_not_found";
    private static final String COMMENT_TEXT_TO0_LONG = "comment_text_too_long";

    private final UserRepository userRepository;

    private final UserRepository quizzRepository;

    private final ExceptionMessageAccessor exceptionMessageAccessor;

    public void validateComment(CommentRequest commentRequest) {

        final String commentText = commentRequest.getText();
        final int userId = commentRequest.getUser_id();
        checkUserExist(userId);

        final int quizzId = commentRequest.getQuizz_id();
        checkQuizzExist(quizzId);

        checkCommentTextLength(commentText);
    }

    private void checkUserExist(int userId) {

        final boolean existsUserById = userRepository.existsById(userId);

        if (!existsUserById) {

            log.warn("{} User not found with this id !", userId);
            final String userNotExist = exceptionMessageAccessor.getMessage(null, USER_NOT_FOUND);

            throw new CommentException(userNotExist);
        }
    }

    private void checkQuizzExist(int quizzId) {

        final boolean existsQuizzById = quizzRepository.existsById(quizzId);

        if (!existsQuizzById) {

            log.warn("{} Quizz not found with this id !", quizzId);
            final String quizzNotExist = exceptionMessageAccessor.getMessage(null, QUIZZ_NOT_FOUND);

            throw new CommentException(quizzNotExist);
        }
    }

    private void checkCommentTextLength(String commentText) {

        if (commentText.length() > 1024) {
            log.warn("{} comment text is too long ! 1024 characters max", commentText);
            final String messageTooLong = exceptionMessageAccessor.getMessage(null, COMMENT_TEXT_TO0_LONG);

            throw new CommentException(messageTooLong);
        }
    }

}
