package design.ultimate_quizz.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "History")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private LocalDate creationDate;

    @ManyToOne
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "quizz_id")
    private Quizz quizz;

    @ManyToOne
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private int points;

    @Column(nullable = false)
    private float time;

    public History(int id, LocalDate creationDate, User user, Quizz quizz, int points, float time) {
        this.id = id;
        this.creationDate = creationDate;
        this.user = user;
        this.quizz = quizz;
        this.points = points;
        this.time = time;
    }

}
