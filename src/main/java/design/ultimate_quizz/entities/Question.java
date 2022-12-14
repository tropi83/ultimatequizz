package design.ultimate_quizz.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 255)
    private String label;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quizz_id")
    @JsonBackReference
    private Quizz quizz;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<>();

    public Question(int id, String label, Quizz quizz, List<Answer> answers) {
        this.id = id;
        this.label = label;
        this.quizz = quizz;
        this.answers = answers;
    }

}
