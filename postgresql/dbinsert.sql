
/*
 * Insertion des utilisateurs
 */
INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (1,  'string', 'string', 'string', 'string@string.com', '$2a$10$i21Bm9O9rc/gVK.wW9Crou/U1Oi9ncaM6DQfs2Mq6XumpJqywGMaG', 'ADMIN', '2020-11-13', 'Hey !
Je suis l''administrateur pour le swagger');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (2,  'admin', 'admin', 'admin', 'admin@admin.com', '$2a$10$c87hqDvBarrevbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'ADMIN', '2021-11-13', 'Hello !
Je suis l''administrateur pour le frontend');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (3,  'bob', 'Bob', 'Le bricoleur', 'bob@bob.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'ADMIN', '2022-11-13', 'Hello !
Je suis administrateur, et jamais à court d''idées pour surmonter les obstacles.');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (4,  'alice', 'Alice', 'Adsl', 'alice@alice.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'ADMIN', '2022-10-13', 'Salut !
Je suis administrateur, et un fournisseur d''accès à Internet.');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (5,  'string2', 'string2', 'string2', 'string2@string2.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-10-13', 'Hola Senior !
Je suis utilisateur pour le swagger');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (6,  'michelle', 'Michelle', 'Obama', 'michelle@obama.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-04-17', 'Je l''épouse depuis 1992 de Barack Obama');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (7,  'michel', 'Michel', 'Polnareff', 'michel@polnareff.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-05-22', 'Je suis un auteur-compositeur-interprète français');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date)
VALUES (8,  'johnny', 'Johnny', 'Hallyday', 'johnny@hallyday.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-01-06');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date)
VALUES (9,  'nathalie', 'Nathalie', 'Simon', 'nathalie@simon.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-02-13');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date)
VALUES (10,  'bob_dylan', 'Bob', 'Dylan', 'bob@dylan.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-07-09');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date)
VALUES (11,  'margaret', 'Margaret', 'Thatcher', 'margaret@thatcher.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-11-02');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date, description)
VALUES (12,  'gandalf', 'Gandalf', 'LeBlanc', 'gandalf@leblanc.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-11-11', 'Je suis le Cavalier Blanc ');

INSERT INTO users(id, username, firstname, lastname, email, password, user_role, creation_date)
VALUES (13,  'larry', 'Larry', 'Flint', 'larry@flint.com', '$2a$10$c87hqDvBarvbgR2a3X0hxe7WlWAZla8NNtFfiMg92XtOfPl3pd29i', 'USER', '2022-01-28');


/*
 * Insertion des thèmes
 */
INSERT INTO themes(id, name) VALUES (1, 'Géographie');
INSERT INTO themes(id, name) VALUES (2, 'Culture Générale');
INSERT INTO themes(id, name) VALUES (3, 'France');
INSERT INTO themes(id, name) VALUES (4, 'Histoire');
INSERT INTO themes(id, name) VALUES (5, 'Divers');
INSERT INTO themes(id, name) VALUES (6, 'Vocabulaire');
INSERT INTO themes(id, name) VALUES (7, 'Politique');
INSERT INTO themes(id, name) VALUES (8, 'Sciences');
INSERT INTO themes(id, name) VALUES (9, 'Marques & logo');
INSERT INTO themes(id, name) VALUES (10, 'Actualité');

/*
 * Insertion des quizzs
 */
INSERT INTO quizzs(id, name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           1,
           'Quizz Monnaies du monde',
           'Connaissez-vous les différentes monnaies du monde ? Avec ce quiz, nous voyageons à travers le monde pour découvrir les devises locales et leurs spécificités. De nombreux États ont une monnaie propre à leur pays, nous allons donc voir si votre culture du dollar, du peso, du yen et de toutes les autres devises est à jour.

Ce quiz est le second de notre série relative aux monnaies du monde. Vous pouvez voir la première salve de questions avec le lien présent sous ce quiz.',
           true,
           '2022-11-11',
           '2022-11-11',
           1
       );

INSERT INTO quizzs(id, name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           2,
           'Quizz Desserts du Monde',
           'Testez vos connaissances sur les desserts en provenance du monde entier. Ce quiz destiné aux gourmands vous propose des questions sur des célèbres gâteaux ou des pâtisseries populaires dans les différents pays du monde. Au cours des questions, direction New York, la Thaïlande, la Croatie, ou bien encore le Japon pour y découvrir les spécialités culinaires locales.

À chaque question, trouvez la bonne réponse parmi les 4 propositions pour espérer faire le meilleur score possible. Il y a des chances que ce quiz vous donne faim, alors bon quiz à tous.',
           true,
           '2022-11-12',
           '2022-11-12',
           1
       );

INSERT INTO quizzs(id, name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           3,
           'Quiz Culture Générale Facile #1',
           'Testez votre culture générale avec ce onzième quiz de difficulté facile. Nous vous proposons une nouvelle série de 20 questions sur des thématiques des plus variées comme le tennis, les séries télé, les dieux, l''orthographe, un éléphant de grande renommée, ou bien encore la géographie. À chaque question, vous avez 4 propositions, mais une seule est la bonne réponse, à vous de la trouver !

Ce quiz de culture générale facile vous permet de tester vos connaissances sans trop se prendre la tête. Pour monter un peu le niveau, pensez à vous mesurer à nos quiz niveau moyen ou même niveau difficile pour un défi d''un autre ordre. Bonne chance à tous.',
           true,
           '2022-11-13',
           '2022-11-13',
           2
       );



INSERT INTO quizzs(id, name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           4,
           'Quiz île de la Réunion',
           'Connaissez-vous le département français de La Réunion ? Ce quiz vous propose une série de questions centrées sur l''île de la Réunion. Vous pouvez tester votre savoir, ou bien apprendre beaucoup d''informations car nous vous donnons des explications détaillées sur les réponses. Nous nous intéressons à la géographie de cette île, à la culture locale, à l''histoire de l''île, et bien plus encore.

À chaque question, trouvez la bonne réponse parmi les 4 propositions pour faire le meilleur score possible. Bon quiz à tous.',
           true,
           '2022-11-14',
           '2022-11-14',
           3
       );




INSERT INTO quizzs(id, name, description, is_active, creation_date, update_date, theme_id)
VALUES (
           5,
           'Quiz d''orthographe spécial Accents',
           'Êtes-vous un expert des accents dans la langue française ? Le français n''est pas la langue la plus facile à apprendre et l''une des spécificités, c''est d''avoir un large éventail d''accents pour accentuer certaines lettres. Nous avons conçu un quiz pour savoir si vous savez bien utiliser les accents dans les phrases et sur certains mots en particulier. Répondez aux questions de ce quiz pour connaître votre niveau et pour ne plus faire certaines erreurs. Nous sommes nous-même parfois un peu fâchés avec les accents, c''est donc idéal pour faire une grande révision générale pour tout le monde.

Si vous possédez un compte sur Culture Quizz, alors votre score final sera converti en point pour le grand classement général des meilleurs joueurs de la semaine. Bon quiz d''orthographe à tous.',
           true,
           '2022-11-14',
           '2022-11-14',
           6
       );

/*
 * Insertion des questions
 */
INSERT INTO questions(id, label, quizz_id) VALUES (1, 'Lequel de ces États ne paye pas en Euro ?', 1);
INSERT INTO questions(id, label, quizz_id) VALUES (2, 'Quelle est la monnaie utilisée en Chine ?', 1);
INSERT INTO questions(id, label, quizz_id) VALUES (3, 'Que trouve-t-on sur les pièces de 1 € et 2 € de l’Allemagne ?', 1);
INSERT INTO questions(id, label, quizz_id) VALUES (4, 'Quelle est la monnaie de la Syrie ?', 1);
INSERT INTO questions(id, label, quizz_id) VALUES (5, 'Quelle est la monnaie utilisée en Ukraine ?', 1);

INSERT INTO questions(id, label, quizz_id) VALUES (6,  'Quel est le biscuit utilisé pour la fabrication du Tiramisu, le plus célèbre dessert italien ?', 2);
INSERT INTO questions(id, label, quizz_id) VALUES (7,  'Que signifie Baba dans le délicieux dessert polonais le Baba au rhum ?', 2);
INSERT INTO questions(id, label, quizz_id) VALUES (8,  'Quel dessert porte bien mal son nom puisqu’il fut inventé par un Français, le Chef Balzac, en 1867 ?', 2);
INSERT INTO questions(id, label, quizz_id) VALUES (9,  'Le banofee pie est un dessert britannique qui se compose de biscuits secs, de confiture de lait et de chantilly. Quel autre ingrédient est indispensable à ce dessert ?', 2);
INSERT INTO questions(id, label, quizz_id) VALUES (10,  'Dans quel pays a été créé le cheesecake new-yorkais ?', 2);

INSERT INTO questions(id, label, quizz_id) VALUES (11,  '"Mais, ou, et, donc, or, ni, car" sont des conjonctions de...', 3);
INSERT INTO questions(id, label, quizz_id) VALUES (12,  'Quel est le parti politique de Nathalie Arthaud, candidate à l''élection présidentielle de 2012, 2017 et 2022 ?', 3);
INSERT INTO questions(id, label, quizz_id) VALUES (13,  'A combien de jours équivalent 72 heures ?', 3);
INSERT INTO questions(id, label, quizz_id) VALUES (14,  'A Hollywood, par quel symbole les célébrités sont-elles représentées sur le sol du Walk Of Fame ?', 3);
INSERT INTO questions(id, label, quizz_id) VALUES (15,  'A la belote, un jeu de cartes se compose de trèfles, de piques, de cœurs et de...', 3);

INSERT INTO questions(id, label, quizz_id) VALUES (16,  'Quelle est la bonne orthographe de ce mot ?', 4);
INSERT INTO questions(id, label, quizz_id) VALUES (17,  'Comment faut-il écrire ce mot ?', 4);
INSERT INTO questions(id, label, quizz_id) VALUES (18,  'Quelle est la bonne orthographe de ce mot ?', 4);
INSERT INTO questions(id, label, quizz_id) VALUES (19,  'Comment s''appellent les deux petits points placés sur le "i" du mot "astéroïde" ?', 4);
INSERT INTO questions(id, label, quizz_id) VALUES (20,  'Lequel de ces mots devrait avoir un accent ?', 4);

INSERT INTO questions(id, label, quizz_id) VALUES (21,  'Dans quel océan se situe l’île de la Réunion ?', 5);
INSERT INTO questions(id, label, quizz_id) VALUES (22,  'Quelle est la capitale de l’île de la Réunion ?', 5);
INSERT INTO questions(id, label, quizz_id) VALUES (23,  'Quel volcan célèbre se situe sur l’île de la Réunion ?', 5);
INSERT INTO questions(id, label, quizz_id) VALUES (24,  'Quelle est la superficie de l’île de la Réunion ?', 5);
INSERT INTO questions(id, label, quizz_id) VALUES (25,  'Quel est le point culminant de l’île de la Réunion ?', 5);

/*
 * Insertion des réponses
 */
INSERT INTO answers(id, label, is_correct, question_id) VALUES (1,  'Monaco', false, 1);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (2,  'Suède', true, 1);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (3,  'Slovénie', false, 1);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (4,  'Finland', false, 1);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (5,  'Dong', false, 2);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (6,  'Yen', false, 2);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (7,  'Yuan', true, 2);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (8,  'Won', false, 2);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (9,  'Un rameau de chêne', false, 3);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (10,  'La porte de Brandebourg', false, 3);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (11,  'Un aigle', true, 3);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (12,  'Une choucroute', false, 3);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (13,  'La livre syrienne', true, 4);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (14,  'Le dollar syrien', false, 4);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (15,  'Le franc syrien', false, 4);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (16,  'Le ringgit', false, 4);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (17,  'Hrywbja', true, 5);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (18,  'Euro', false, 5);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (19,  'Tala', false, 5);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (20,  'Zloti', false, 5);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (21,  'Le biscuit à la cuillère', true, 6);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (22,  'Le biscuit à la noisette', false, 6);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (23,  'Le biscuit dacquoise', false, 6);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (24,  'Le biscuit pain de Gênes', false, 6);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (25,  'Grand-père', false, 7);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (26,  'Grand-mère', true, 7);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (27,  'Oncle', false, 7);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (28,  'Tante', false, 7);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (29,  'Les gauffres belges', false, 8);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (30,  'L''omelette', true, 8);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (31,  'Le pasteis de nata', false, 8);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (32,  'La crème catalane', false, 8);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (33,  'Pommes', false, 9);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (34,  'Noix', false, 9);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (35,  'Café', false, 9);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (36,  'Bannanes', true, 9);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (37,  'L''Irlande', false, 10);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (38,  'L''Angleterre', false, 10);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (39,  'La Grèce', true, 10);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (40,  'L''Italie', false, 10);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (41,  'Coordination', true, 11);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (42,  'Subjectivité', false, 11);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (43,  'Subordination', false, 11);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (44,  'Conjugaison', false, 11);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (45,  'Le Parti Socialiste', false, 12);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (46,  'Europe Ecologie les Verts', false, 12);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (47,  'Les Républicains', false, 12);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (48,  'Lutte Ouvrière', true, 12);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (49,  '2 Jours', false, 13);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (50,  '3 Jours', true, 13);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (51,  '4 Jours', false, 13);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (52,  '5 Jours', false, 13);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (53,  'Des Oscars', false, 14);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (54,  'Des lettres géantes', false, 14);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (55,  'Des étoiles', true, 14);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (56,  'Des noms de rues', false, 14);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (57,  'Carrés', false, 15);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (58,  'Hexagones', false, 15);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (59,  'Trapèzes', false, 15);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (60,  'Carreaux', true, 15);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (61,  'Mystère', true, 16);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (62,  'Mystêre', false, 16);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (63,  'Mystére', false, 16);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (64,  'Chateau', false, 17);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (65,  'Château', true, 17);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (66,  'Événement', false, 18);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (67,  'Évènement', false, 18);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (68,  'Les deux options', true, 18);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (69,  'Un astérisque', false, 19);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (70,  'Un circonflexe', false, 19);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (71,  'Un tréma', true, 19);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (73,  'Une élision', false, 19);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (74,  'Revolver', false, 20);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (75,  'Moelle', false, 20);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (76,  'Pediatre', true, 20);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (77,  'Prescription', false, 20);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (78,  'L’océan Indien', true, 21);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (79,  'L’océan Pacifique', false, 21);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (80,  'L’océan Atlantique', false, 21);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (81,  'L’océan Austral', false, 21);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (82,  'Saint-Pierre', false, 22);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (83,  'Saint-Paul', false, 22);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (84,  'Saint-Denis', true, 22);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (85,  'Saint-Georges', false, 22);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (86,  'La Montagne Pelée', false, 23);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (87,  'La Grande Soufrière', true, 23);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (88,  'Le Mont Rainier', true, 23);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (89,  'Le Piton de la Fournaise', true,23);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (90,  '992 km2', false, 24);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (91,  '2512 km2', true, 24);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (92,  '3900 km2', false, 24);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (93,  '5240 km2', false, 24);

INSERT INTO answers(id, label, is_correct, question_id) VALUES (94,  'Le Piton de la Fournaise', false, 25);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (95,  'Le Piton des neiges', true, 25);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (96,  'Le Piton rouge', false, 25);
INSERT INTO answers(id, label, is_correct, question_id) VALUES (97,  'Le Bonnet de Prêtre', false, 25);

/*
 * Insertion des historiques de mes couilles
 * (mais c'est propasse au moins !!!! )
 */
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (1, '2022-11-12', 20, 100.12, 1, 1);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (2, '2022-11-14', 10,   62.2, 2, 1);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (3, '2022-11-13', 10,  250.3, 3, 1);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (4, '2022-11-12', 20, 140.44, 1, 2);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (5, '2022-11-13', 10,  62.21, 2, 2);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (6, '2022-11-14', 10,  42.12, 3, 2);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (7, '2022-11-13', 20, 240.44, 1, 3);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (8, '2022-11-11', 10, 240.44, 2, 3);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (9, '2022-11-13', 10, 340.44, 3, 3);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (10, '2022-11-11', 20, 540.33, 1, 4);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (11, '2022-11-12', 10,  40.24, 2, 4);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (12, '2022-11-13', 10, 240.11, 3, 4);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (13, '2022-11-11', 20, 5140.13, 1, 5);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (14, '2022-11-12', 10,  340.03, 2, 5);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (15, '2022-11-16', 10,  240.33, 3, 5);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (16, '2022-11-15', 10,  740.43, 4, 5);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (17, '2022-11-15', 20, 510.13, 1, 6);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (18, '2022-11-12', 10, 340.03, 2, 6);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (19, '2022-11-14', 10, 740.43, 4, 6);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (20, '2022-11-15', 20, 40.13, 1, 7);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (21, '2022-11-11', 20,  540.13, 2, 8);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (22, '2022-11-16', 10, 1240.33, 3, 8);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (23, '2022-11-15', 10, 1040.43, 5, 8);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (24, '2022-11-11', 20, 5140.13, 1, 9);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (25, '2022-11-16', 10,  540.33, 5, 9);

INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (26, '2022-11-11', 20, 622.13, 5, 10);
INSERT INTO history (id, creation_date, points, time, quizz_id, user_id) VALUES (27, '2022-11-16', 10, 100.33, 5, 10);