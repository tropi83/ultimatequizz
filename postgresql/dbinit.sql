/*
 Creation de la base de données UltimateQuizz & Utilisateur
 */
CREATE DATABASE ultimate_quizz;
CREATE USER ultimate_quizz_admin WITH PASSWORD 'azerty';
GRANT ALL PRIVILEGES ON DATABASE ultimate_quizz TO ultimate_quizz_admin;
