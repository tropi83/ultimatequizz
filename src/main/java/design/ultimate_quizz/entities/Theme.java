package design.ultimate_quizz.entities;

import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "themes")
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false , unique = true , length = 255)
    private String name;

    public Theme(String name) {
        this.name = name;
    }

}
