package design.ultimate_quizz.security.service.history;

import design.ultimate_quizz.entities.History;
import design.ultimate_quizz.entities.Quizz;
import design.ultimate_quizz.entities.Theme;
import design.ultimate_quizz.entities.User;
import design.ultimate_quizz.security.dto.history.HistoryRequest;
import design.ultimate_quizz.security.dto.quizz.QuizzRequest;
import design.ultimate_quizz.security.dto.quizz.QuizzResponse;

import java.util.List;
import java.util.Optional;

public interface HistoryService {

	History addHistory(HistoryRequest historyRequest);

	List<History> getHistories();

	List<History> getHistoriesByUser(Optional<User> user);


	void deleteHistory(int id);

	Optional<History> getHistoryById(int id);
}
