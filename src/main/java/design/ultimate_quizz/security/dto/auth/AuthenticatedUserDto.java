package design.ultimate_quizz.security.dto.auth;

import design.ultimate_quizz.entities.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
public class AuthenticatedUserDto {

	private int id;

	private String firstname;

	private String lastname;

	private String email;

	private String username;

	private String password;

	private UserRole userRole;

	private LocalDate creationDate;

	private String description;

}
