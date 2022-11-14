package design.ultimate_quizz.entities;
import lombok.*;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "quizz_id")
    private Quizz quizz;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private int point;

    public History(int id, User user, Quizz quizz, int point) {
        this.id = id;
        this.user = user;
        this.quizz = quizz;
        this.point = point;
    }


}
