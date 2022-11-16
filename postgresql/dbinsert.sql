
/*
 * Insertion des utilisateurs
 */
INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES ('string', 'string', 'string', 'string@string.com', '$2a$10$i21Bm9O9rc/gVK.wW9Crou/U1Oi9ncaM6DQfs2Mq6XumpJqywGMaG', 'ADMIN', '2020-11-13', 'Hey !
Je suis l''administrateur pour le swagger');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES ('admin', 'admin', 'admin', 'admin@admin.com', '$2a$10$c87hqDvBarrevbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'ADMIN', '2021-11-13', 'Hello !
Je suis l''administrateur pour le frontend');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES ('bob', 'Bob', 'Le bricoleur', 'bob@bob.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'ADMIN', '2022-11-13', 'Hello !
Je suis administrateur, et jamais à court d''idées pour surmonter les obstacles.');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES ('alice', 'Alice', 'Adsl', 'alice@alice.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'ADMIN', '2022-10-13', 'Salut !
Je suis administrateur, et un fournisseur d''accès à Internet.');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES ('string2', 'string2', 'string2', 'string2@string2.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-10-13', 'Hola Senior !
Je suis utilisateur pour le swagger');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES ('michelle', 'Michelle', 'Obama', 'michelle@obama.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-04-17', 'Je l''épouse depuis 1992 de Barack Obama');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('michel', 'Michel', 'Polnareff', 'michel@polnareff.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-05-22');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('johnny', 'Johnny', 'Hallyday', 'johnny@hallyday.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-01-06');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('nathalie', 'Nathalie', 'Simon', 'nathalie@simon.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-02-13');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('celine', 'Céline', 'Dion', 'celine@dion.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-03-09');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('bob_dylan', 'Bob', 'Dylan', 'bob@dylan.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-07-09');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('margaret', 'Margaret', 'Thatcher', 'margaret@thatcher.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-11-02');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('gandalf', 'Gandalf', 'LeBlanc', 'gandalf@leblanc.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-11-11');

INSERT INTO users(username, firstname, lastname, email, password, user_role, creation_date)
VALUES ('larry', 'Larry', 'Flint', 'larry@flint.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-01-28');


/*
 * Insertion des thèmes
 */
INSERT INTO themes(name) VALUES ('Géographie');
INSERT INTO themes(name) VALUES ('Culture Générale');
INSERT INTO themes(name) VALUES ('France');
INSERT INTO themes(name) VALUES ('Histoire');
INSERT INTO themes(name) VALUES ('Divers');
INSERT INTO themes(name) VALUES ('Vocabulaire');
INSERT INTO themes(name) VALUES ('Politique');
INSERT INTO themes(name) VALUES ('Sciences');
INSERT INTO themes(name) VALUES ('Marques & logo');
INSERT INTO themes(name) VALUES ('Actualité');

/*
 * Insertion des quizzs
 */
INSERT INTO quizzs(name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           'Quizz Monnaies du monde',
           'Connaissez-vous les différentes monnaies du monde ? Avec ce quiz, nous voyageons à travers le monde pour découvrir les devises locales et leurs spécificités. De nombreux États ont une monnaie propre à leur pays, nous allons donc voir si votre culture du dollar, du peso, du yen et de toutes les autres devises est à jour.

Ce quiz est le second de notre série relative aux monnaies du monde. Vous pouvez voir la première salve de questions avec le lien présent sous ce quiz.',
           true,
           '2022-11-11',
           '2022-11-11',
           1
       );

INSERT INTO quizzs(name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           'Quizz Desserts du Monde',
           'Testez vos connaissances sur les desserts en provenance du monde entier. Ce quiz destiné aux gourmands vous propose des questions sur des célèbres gâteaux ou des pâtisseries populaires dans les différents pays du monde. Au cours des questions, direction New York, la Thaïlande, la Croatie, ou bien encore le Japon pour y découvrir les spécialités culinaires locales.

À chaque question, trouvez la bonne réponse parmi les 4 propositions pour espérer faire le meilleur score possible. Il y a des chances que ce quiz vous donne faim, alors bon quiz à tous.',
           true,
           '2022-11-12',
           '2022-11-12',
           1
       );

INSERT INTO quizzs(name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           'Quiz Culture Générale Facile #1',
           'Testez votre culture générale avec ce onzième quiz de difficulté facile. Nous vous proposons une nouvelle série de 20 questions sur des thématiques des plus variées comme le tennis, les séries télé, les dieux, l''orthographe, un éléphant de grande renommée, ou bien encore la géographie. À chaque question, vous avez 4 propositions, mais une seule est la bonne réponse, à vous de la trouver !

Ce quiz de culture générale facile vous permet de tester vos connaissances sans trop se prendre la tête. Pour monter un peu le niveau, pensez à vous mesurer à nos quiz niveau moyen ou même niveau difficile pour un défi d''un autre ordre. Bonne chance à tous.',
           true,
           '2022-11-13',
           '2022-11-13',
           2
       );

INSERT INTO quizzs(name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           'Quiz d''orthographe spécial Accents',
           'Êtes-vous un expert des accents dans la langue française ? Le français n''est pas la langue la plus facile à apprendre et l''une des spécificités, c''est d''avoir un large éventail d''accents pour accentuer certaines lettres. Nous avons conçu un quiz pour savoir si vous savez bien utiliser les accents dans les phrases et sur certains mots en particulier. Répondez aux questions de ce quiz pour connaître votre niveau et pour ne plus faire certaines erreurs. Nous sommes nous-même parfois un peu fâchés avec les accents, c''est donc idéal pour faire une grande révision générale pour tout le monde.

Si vous possédez un compte sur Culture Quizz, alors votre score final sera converti en point pour le grand classement général des meilleurs joueurs de la semaine. Bon quiz d''orthographe à tous.',
           true,
           '2022-11-14',
           '2022-11-14',
           6
       );

INSERT INTO quizzs(name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           'Quiz île de la Réunion',
           'Connaissez-vous le département français de La Réunion ? Ce quiz vous propose une série de questions centrées sur l''île de la Réunion. Vous pouvez tester votre savoir, ou bien apprendre beaucoup d''informations car nous vous donnons des explications détaillées sur les réponses. Nous nous intéressons à la géographie de cette île, à la culture locale, à l''histoire de l''île, et bien plus encore.

À chaque question, trouvez la bonne réponse parmi les 4 propositions pour faire le meilleur score possible. Bon quiz à tous.',
           true,
           '2022-11-14',
           '2022-11-14',
           3
       );

/*
 * Insertion des questions
 */
INSERT INTO questions(label, quizz_id) VALUES ('Lequel de ces États ne paye pas en Euro ?', 1);
INSERT INTO questions(label, quizz_id) VALUES ('Quelle est la monnaie utilisée en Chine ?', 1);
INSERT INTO questions(label, quizz_id) VALUES ('Que trouve-t-on sur les pièces de 1 € et 2 € de l’Allemagne ?', 1);
INSERT INTO questions(label, quizz_id) VALUES ('Quelle est la monnaie de la Syrie ?', 1);
INSERT INTO questions(label, quizz_id) VALUES ('Quelle est la monnaie utilisée en Ukraine ?', 1);

INSERT INTO questions(label, quizz_id) VALUES ('Quel est le biscuit utilisé pour la fabrication du Tiramisu, le plus célèbre dessert italien ?', 2);
INSERT INTO questions(label, quizz_id) VALUES ('Que signifie Baba dans le délicieux dessert polonais le Baba au rhum ?', 2);
INSERT INTO questions(label, quizz_id) VALUES ('Quel dessert porte bien mal son nom puisqu’il fut inventé par un Français, le Chef Balzac, en 1867 ?', 2);
INSERT INTO questions(label, quizz_id) VALUES ('Le banofee pie est un dessert britannique qui se compose de biscuits secs, de confiture de lait et de chantilly. Quel autre ingrédient est indispensable à ce dessert ?', 2);
INSERT INTO questions(label, quizz_id) VALUES ('Dans quel pays a été créé le cheesecake new-yorkais ?', 2);

INSERT INTO questions(label, quizz_id) VALUES ('"Mais, ou, et, donc, or, ni, car" sont des conjonctions de...', 3);
INSERT INTO questions(label, quizz_id) VALUES ('Quel est le parti politique de Nathalie Arthaud, candidate à l''élection présidentielle de 2012, 2017 et 2022 ?', 3);
INSERT INTO questions(label, quizz_id) VALUES ('A combien de jours équivalent 72 heures ?', 3);
INSERT INTO questions(label, quizz_id) VALUES ('A Hollywood, par quel symbole les célébrités sont-elles représentées sur le sol du Walk Of Fame ?', 3);
INSERT INTO questions(label, quizz_id) VALUES ('A la belote, un jeu de cartes se compose de trèfles, de piques, de cœurs et de...', 3);

INSERT INTO questions(label, quizz_id) VALUES ('Quelle est la bonne orthographe de ce mot ?', 4);
INSERT INTO questions(label, quizz_id) VALUES ('Comment faut-il écrire ce mot ?', 4);
INSERT INTO questions(label, quizz_id) VALUES ('Quelle est la bonne orthographe de ce mot ?', 4);
INSERT INTO questions(label, quizz_id) VALUES ('Comment s''appellent les deux petits points placés sur le "i" du mot "astéroïde" ?', 4);
INSERT INTO questions(label, quizz_id) VALUES ('Lequel de ces mots devrait avoir un accent ?', 4);

INSERT INTO questions(label, quizz_id) VALUES ('Dans quel océan se situe l’île de la Réunion ?', 5);
INSERT INTO questions(label, quizz_id) VALUES ('Quelle est la capitale de l’île de la Réunion ?', 5);
INSERT INTO questions(label, quizz_id) VALUES ('Quel volcan célèbre se situe sur l’île de la Réunion ?', 5);
INSERT INTO questions(label, quizz_id) VALUES ('Quelle est la superficie de l’île de la Réunion ?', 5);
INSERT INTO questions(label, quizz_id) VALUES ('Quel est le point culminant de l’île de la Réunion ?', 5);

/*
 * Insertion des réponses
 */
INSERT INTO answers(label, is_correct, question_id) VALUES ('Monaco', false, 1);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Suède', true, 1);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Slovénie', false, 1);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Finland', false, 1);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Dong', false, 2);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Yen', false, 2);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Yuan', true, 2);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Won', false, 2);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Un rameau de chêne', false, 3);
INSERT INTO answers(label, is_correct, question_id) VALUES ('La porte de Brandebourg', false, 3);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Un aigle', true, 3);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Une choucroute', false, 3);
INSERT INTO answers(label, is_correct, question_id) VALUES ('La livre syrienne', true, 4);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le dollar syrien', false, 4);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le franc syrien', false, 4);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le ringgit', false, 4);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Hrywbja', true, 5);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Euro', false, 5);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Tala', false, 5);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Zloti', false, 5);


INSERT INTO answers(label, is_correct, question_id) VALUES ('Le biscuit à la cuillère', true, 6);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le biscuit à la noisette', false, 6);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le biscuit dacquoise', false, 6);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le biscuit pain de Gênes', false, 6);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Grand-père', false, 7);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Grand-mère', true, 7);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Oncle', false, 7);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Tante', false, 7);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Les gauffres belges', false, 8);
INSERT INTO answers(label, is_correct, question_id) VALUES ('L''omelette', true, 8);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le pasteis de nata', false, 8);
INSERT INTO answers(label, is_correct, question_id) VALUES ('La crème catalane', false, 8);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Pommes', false, 9);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Noix', false, 9);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Café', false, 9);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Bannanes', true, 9);
INSERT INTO answers(label, is_correct, question_id) VALUES ('L''Irlande', false, 10);
INSERT INTO answers(label, is_correct, question_id) VALUES ('L''Angleterre', false, 10);
INSERT INTO answers(label, is_correct, question_id) VALUES ('La Grèce', true, 10);
INSERT INTO answers(label, is_correct, question_id) VALUES ('L''Italie', false, 10);

INSERT INTO answers(label, is_correct, question_id) VALUES ('Coordination', true, 11);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Subjectivité', false, 11);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Subordination', false, 11);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Conjugaison', false, 11);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le Parti Socialiste', false, 12);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Europe Ecologie les Verts', false, 12);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Les Républicains', false, 12);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Lutte Ouvrière', true, 12);
INSERT INTO answers(label, is_correct, question_id) VALUES ('2 Jours', false, 13);
INSERT INTO answers(label, is_correct, question_id) VALUES ('3 Jours', true, 13);
INSERT INTO answers(label, is_correct, question_id) VALUES ('4 Jours', false, 13);
INSERT INTO answers(label, is_correct, question_id) VALUES ('5 Jours', false, 13);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Des Oscars', false, 14);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Des lettres géantes', false, 14);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Des étoiles', true, 14);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Des noms de rues', false, 14);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Carrés', false, 15);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Hexagones', false, 15);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Trapèzes', false, 15);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Carreaux', true, 15);

INSERT INTO answers(label, is_correct, question_id) VALUES ('Mystère', true, 16);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Mystêre', false, 16);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Mystére', false, 16);

INSERT INTO answers(label, is_correct, question_id) VALUES ('Chateau', false, 17);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Château', true, 17);

INSERT INTO answers(label, is_correct, question_id) VALUES ('Événement', false, 18);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Évènement', false, 18);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Les deux options', true, 18);

INSERT INTO answers(label, is_correct, question_id) VALUES ('Un astérisque', false, 19);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Un circonflexe', false,19);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Un tréma', true, 19);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Une élision', false, 19);

INSERT INTO answers(label, is_correct, question_id) VALUES ('Revolver', false, 20);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Moelle', false, 20);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Pediatre', true, 20);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Prescription', false, 20);

INSERT INTO answers(label, is_correct, question_id) VALUES ('L’océan Indien', true, 21);
INSERT INTO answers(label, is_correct, question_id) VALUES ('L’océan Pacifique', false, 21);
INSERT INTO answers(label, is_correct, question_id) VALUES ('L’océan Atlantique', false, 21);
INSERT INTO answers(label, is_correct, question_id) VALUES ('L’océan Austral', false, 21);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Saint-Pierre', false, 22);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Saint-Paul', false, 22);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Saint-Denis', true, 22);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Saint-Georges', false, 22);
INSERT INTO answers(label, is_correct, question_id) VALUES ('La Montagne Pelée', false, 23);
INSERT INTO answers(label, is_correct, question_id) VALUES ('La Grande Soufrière', true, 23);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le Mont Rainier', true, 23);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le Piton de la Fournaise', true, 23);
INSERT INTO answers(label, is_correct, question_id) VALUES ('992 km2', false, 24);
INSERT INTO answers(label, is_correct, question_id) VALUES ('2512 km2', true, 24);
INSERT INTO answers(label, is_correct, question_id) VALUES ('3900 km2', false, 24);
INSERT INTO answers(label, is_correct, question_id) VALUES ('5240 km2', false, 24);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le Piton de la Fournaise', false, 25);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le Piton des neiges', true, 25);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le Piton rouge', false, 25);
INSERT INTO answers(label, is_correct, question_id) VALUES ('Le Bonnet de Prêtre', false, 25);

/*
 * Insertion des historiques
 */
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-12', 20, 100.12, 1, 1);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-14', 10,   62.2, 2, 1);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-13', 10,  250.3, 3, 1);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-12', 20, 140.44, 1, 2);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-13', 10,  62.21, 2, 2);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-14', 10,  42.12, 3, 2);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-13', 20, 240.44, 1, 3);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-11', 10, 240.44, 2, 3);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-13', 10, 340.44, 3, 3);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-11', 20, 540.33, 1, 4);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-12', 10,  40.24, 2, 4);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-13', 10, 240.11, 3, 4);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-11', 20, 5140.13, 1, 5);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-12', 10,  340.03, 2, 5);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-16', 10,  240.33, 3, 5);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-15', 10,  740.43, 4, 5);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-15', 20, 510.13, 1, 6);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-12', 10, 340.03, 2, 6);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-14', 10, 740.43, 4, 6);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-15', 20, 40.13, 1, 7);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-11', 20,  540.13, 2, 8);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-16', 10, 1240.33, 3, 8);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-15', 10, 1040.43, 5, 8);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-11', 20, 5140.13, 1, 9);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-16', 10,  540.33, 5, 9);

INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-11', 20, 622.13, 5, 10);
INSERT INTO histories (creation_date, points, time, quizz_id, user_id) VALUES ('2022-11-16', 10, 100.33, 5, 10);

/*
 * Insertion des commentaires
 */
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-17', 'Super !', 2, 1);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-16', 'Au top !', 5, 1);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-18', 'Complètement nul, pas assez de questions !', 3, 2);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-16', ':) !', 5, 2);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-14', 'Trop court !', 5, 3);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-11', 'Génial ce quizz !', 1, 4);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-16', 'Trop long !', 2, 5);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-09', 'J''adore les animaux !', 5, 6);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-01', 'Super !', 5, 7);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-12', 'Le thème ne correspond pas vraiment aux questions.', 1, 7);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-12', 'Super !', 3, 8);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-16', 'J''aime les sandwitchs à la fraise !', 1, 10);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-12', 'Sympa !', 4, 8);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-14', 'Absurde...', 4, 3);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-16', 'Dingue !', 1, 10);
INSERT INTO comments (creation_date, text, quizz_id, user_id) VALUES ('2022-11-18', 'Rarement fait mieux !', 4, 8);

