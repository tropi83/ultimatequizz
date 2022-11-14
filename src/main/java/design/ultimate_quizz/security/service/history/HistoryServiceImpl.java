package design.ultimate_quizz.security.service.history;

import design.ultimate_quizz.entities.*;
import design.ultimate_quizz.repository.HistoryRepository;
import design.ultimate_quizz.repository.QuizzRepository;
import design.ultimate_quizz.repository.UserRepository;
import design.ultimate_quizz.security.dto.history.HistoryRequest;
import design.ultimate_quizz.service.HistoryValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

	private final HistoryRepository historyRepository;
	private final QuizzRepository quizzRepository;
	private final UserRepository userRepository;
	private final HistoryValidationService historyValidationService;

	@Override
	public History addHistory(HistoryRequest historyRequest) {

		historyValidationService.validateHistory(historyRequest);


		final int quizzId = historyRequest.getQuizz_id();
		final int point = historyRequest.getPoint();
		final int userId = historyRequest.getUser_id();


		final Quizz quizz = quizzRepository.getOne(quizzId);
		final User user = userRepository.getOne(userId);

		final History history = new History(0, user, quizz, point);
		historyRepository.save(history);

		log.info("{} history added successfully !", history.getId());
		return history;
	}


	@Override
	public List<History> getHistories() {

		return historyRepository.findAll();
	}
	@Override
	public List<History> getHistoriesByUser(Optional<User> user) {

		return historyRepository.findByUser(user);
	}

	@Override
	public Optional<History> getHistoryById(int id) {

		return historyRepository.findById(id);
	}

	@Override
	public void deleteHistory(int id) {

		this.historyRepository.deleteById(id);
	}
}
