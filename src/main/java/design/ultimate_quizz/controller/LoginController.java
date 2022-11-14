package design.ultimate_quizz.controller;

import design.ultimate_quizz.security.dto.auth.JwtRequest;
import design.ultimate_quizz.security.dto.auth.LoginRequest;
import design.ultimate_quizz.security.dto.auth.LoginResponse;
import design.ultimate_quizz.security.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LoginController {

	private final JwtTokenService jwtTokenService;

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("login")
	public ResponseEntity<LoginResponse> loginRequest(@Valid @RequestBody LoginRequest loginRequest) {

		final LoginResponse loginResponse = jwtTokenService.getLoginResponse(loginRequest);

		return ResponseEntity.ok(loginResponse);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("check-authentication")
	public ResponseEntity<LoginResponse> checkAuthenticationRequest(@Valid @RequestBody JwtRequest jwtRequest) {

		final String toto = "-------------------------------------------------------------------";
		System.out.println(toto);

		final LoginResponse loginResponse = jwtTokenService.checkAuthenticationResponse(jwtRequest);
		System.out.println(loginResponse.getToken());
		System.out.println(loginResponse.getUser());
		return ResponseEntity.ok(loginResponse);
	}

}
