package design.ultimate_quizz.security.service.question;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.repository.AnswerRepository;
import design.ultimate_quizz.repository.QuestionRepository;
import design.ultimate_quizz.repository.QuizzRepository;
import design.ultimate_quizz.security.dto.question.QuestionRequest;
import design.ultimate_quizz.security.dto.question.QuestionResponse;
import design.ultimate_quizz.security.mapper.QuestionMapper;
import design.ultimate_quizz.service.QuestionValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

	private final QuestionRepository questionRepository;

	private final QuizzRepository quizzRepository;

	private final AnswerRepository answerRepository;

	private final QuestionValidationService questionValidationService;

	@Override
	public Question addQuestion(QuestionRequest questionRequest) {

		questionValidationService.validateQuestion(questionRequest);

		final String questionLabel = questionRequest.getLabel();
		final int quizzId = questionRequest.getQuizz_id();
		final List<Answer> questionAnswers = questionRequest.getAnswers();

		final Quizz quizz = quizzRepository.getOne(quizzId);
		final Question question = new Question(0, questionLabel, quizz, questionAnswers);
		questionRepository.save(question);

		for (Answer answer : questionAnswers) {
			answer.setQuestion(question);
			answerRepository.save(answer);
		}
		question.setAnswers(questionAnswers);

		log.info("{} question added successfully !", question.getId());
		return question;
	}

	@Override
	public QuestionResponse updateQuestion(int id, QuestionRequest questionRequest) {

		questionValidationService.validatePutQuestion(questionRequest);

		final Optional<Question> existQuestion = getQuestionById(id);
		final Question question = QuestionMapper.INSTANCE.convertToQuestion(questionRequest);
		final int quizzId = questionRequest.getQuizz_id();
		final Quizz quizz = quizzRepository.getOne(quizzId);

		if (existQuestion.isPresent()) {
			question.setId(id);
			question.setLabel(questionRequest.getLabel());
			question.setQuizz(quizz);
			questionRepository.save(question);

			log.info("{} question updated successfully !", question.getId());
		}

		return new QuestionResponse(question);
	}

	@Override
	public List<Question> getQuestions() {

		return questionRepository.findAll();
	}

	@Override
	public List<Question> getQuestionsByQuizz(Optional<Quizz> quizz) {

		return questionRepository.findByQuizz(quizz);
	}

	@Override
	public Optional<Question> getQuestionById(int id) {

		return questionRepository.findById(id);
	}

	@Override
	public void deleteQuestion(int id) {

		this.questionRepository.deleteById(id);
	}
}
