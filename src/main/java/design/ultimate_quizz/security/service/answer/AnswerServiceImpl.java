package design.ultimate_quizz.security.service.answer;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.repository.AnswerRepository;
import design.ultimate_quizz.repository.QuestionRepository;
import design.ultimate_quizz.security.dto.answer.AnswerRequest;
import design.ultimate_quizz.security.dto.answer.AnswerResponse;
import design.ultimate_quizz.security.mapper.AnswerMapper;
import design.ultimate_quizz.service.AnswerValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

	private final QuestionRepository questionRepository;

	private final AnswerRepository answerRepository;

	private final AnswerValidationService answerValidationService;

	@Override
	public Answer addAnswer(AnswerRequest answerRequest) {

		answerValidationService.validateAnswer(answerRequest);

		final String answerLabel = answerRequest.getLabel();
		final int questionId = answerRequest.getQuestion_id();
		final boolean answerIsCorrect = answerRequest.getIsCorrect();

		final Question question = questionRepository.getOne(questionId);
		final Answer answer = new Answer(0, answerLabel, answerIsCorrect, question);
		answerRepository.save(answer);

		log.info("{} answer added successfully !", answer.getId());

		return answer;
	}

	@Override
	public AnswerResponse updateAnswer(int id, AnswerRequest answerRequest) {

		answerValidationService.validatePutAnswer(answerRequest);

		final Optional<Answer> existAnswer = getAnswerById(id);
		final Answer answer = AnswerMapper.INSTANCE.convertToAnswer(answerRequest);
		final int questionId = answerRequest.getQuestion_id();
		final Question question = questionRepository.getOne(questionId);

		if (existAnswer.isPresent()) {
			answer.setId(id);
			answer.setLabel(answerRequest.getLabel());
			answer.setQuestion(question);
			answerRepository.save(answer);

			log.info("{} answer updated successfully !", answer.getId());
		}

		return new AnswerResponse(answer);
	}

	@Override
	public List<Answer> getAnswers() {

		return answerRepository.findAll();
	}

	@Override
	public List<Answer> getAnswersByQuestion(Optional<Question> question) {

		return answerRepository.findByQuestion(question);
	}

	@Override
	public Optional<Answer> getAnswerById(int id) {

		return answerRepository.findById(id);
	}

	@Override
	public void deleteAnswer(int id) {

		this.answerRepository.deleteById(id);
	}
}
