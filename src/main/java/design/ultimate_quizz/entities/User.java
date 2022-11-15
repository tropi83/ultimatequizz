package design.ultimate_quizz.entities;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false, length = 255)
	private String lastname;

	@Column(nullable = false, length = 255)
	private String firstname;

	@Column(unique = true, nullable = false, length = 255)
	private String username;

	@Column(unique = true, length = 255)
	private String description;

	@Column(nullable = false, length = 255)
	private String password;

	@Column(unique = true, nullable = false, length = 255)
	private String email;

	@Column(nullable = false, length = 20)
	@Enumerated(EnumType.STRING)
	public UserRole userRole;

	@Column(nullable = false)
	private LocalDate creationDate;

}
