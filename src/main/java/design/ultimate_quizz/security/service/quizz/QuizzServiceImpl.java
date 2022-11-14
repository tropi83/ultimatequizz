package design.ultimate_quizz.security.service.quizz;

import design.ultimate_quizz.entities.Answer;
import design.ultimate_quizz.entities.Question;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.repository.QuestionRepository;
import design.ultimate_quizz.repository.QuizzRepository;
import design.ultimate_quizz.repository.ThemeRepository;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import design.ultimate_quizz.security.dto.quizz.QuizzResponse;
import design.ultimate_quizz.security.mapper.QuizzMapper;
import design.ultimate_quizz.service.QuizzValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Slf4j
@Service
@RequiredArgsConstructor
public class QuizzServiceImpl implements QuizzService {

	private final QuizzRepository quizzRepository;

	private final ThemeRepository themeRepository;

	private final QuestionRepository questionRepository;

	private final QuizzValidationService quizzValidationService;

	@Override
	public Quizz addQuizz(QuizzRequest quizzRequest) {

		quizzValidationService.validateQuizz(quizzRequest);

		final String quizzName = quizzRequest.getName();
		final String quizzDescription = quizzRequest.getDescription();
		final int themeId = quizzRequest.getTheme_id();
		final boolean quizzIsActive = quizzRequest.getIsActive();
		final List<Question> quizzQuestions = quizzRequest.getQuestions();

		final Theme theme = themeRepository.getOne(themeId);
		final Quizz quizz = new Quizz(0, quizzName, quizzDescription, LocalDate.now(), LocalDate.now(), quizzIsActive, theme, quizzQuestions);
		quizzRepository.save(quizz);

		for (Question question : quizzQuestions) {
			question.setQuizz(quizz);
			questionRepository.save(question);
		}
		quizz.setQuestions(quizzQuestions);

		log.info("{} quizz added successfully !", quizz.getId());
		return quizz;
	}

	@Override
	public QuizzResponse updateQuizz(int id, QuizzRequest quizzRequest) {

		quizzValidationService.validatePutQuizz(id, quizzRequest);

		final Optional<Quizz> existQuizz = getQuizzById(id);
		final Quizz quizz = QuizzMapper.INSTANCE.convertToQuizz(quizzRequest);
		final int themeId = quizzRequest.getTheme_id();
		final Theme theme = themeRepository.getOne(themeId);

		if (existQuizz.isPresent()) {
			quizz.setId(id);
			quizz.setName(quizzRequest.getName());
			quizz.setDescription(quizzRequest.getDescription());
			quizz.setCreationDate(existQuizz.get().getCreationDate());
			quizz.setUpdateDate(LocalDate.now());
			quizz.setIsActive(quizzRequest.getIsActive());
			quizz.setTheme(theme);
			quizzRepository.save(quizz);

			log.info("{} quizz updated successfully !", quizz.getId());
		}

		return new QuizzResponse(quizz);
	}

	@Override
	public List<Quizz> getQuizzs() {

		return quizzRepository.findAll();
	}

	@Override
	public List<Quizz> getQuizzsAsc() {

		return quizzRepository.findAllByOrderByCreationDateAsc();
	}

	@Override
	public List<Quizz> getQuizzsDesc() {

		return quizzRepository.findAllByOrderByCreationDateDesc();
	}

	@Override
	public List<Quizz> getQuizzsByTheme(Optional<Theme> theme) {

		return quizzRepository.findByTheme(theme);
	}

	@Override
	public Optional<Quizz> getQuizzById(int id) {

		return quizzRepository.findById(id);
	}

	@Override
	public void deleteQuizz(int id) {

		this.quizzRepository.deleteById(id);
	}
}
