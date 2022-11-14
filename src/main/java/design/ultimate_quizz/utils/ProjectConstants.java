package design.ultimate_quizz.utils;

import java.util.Locale;


public final class ProjectConstants {

	public static final String DEFAULT_ENCODING = "UTF-8";

	public static final String PROJECT_BASE_PACKAGE = "design.ultimate_quizz";

	public static final Locale FRENCH_LOCALE = new Locale.Builder().setLanguage("fr").setRegion("FR").build();

	private ProjectConstants() {

		throw new UnsupportedOperationException();
	}

}
