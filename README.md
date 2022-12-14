# Ultimate Quizz

[![Dotnet Logo](https://www.vectorlogo.zone/logos/springio/springio-icon.svg)](https://spring.io/)
[![Dotnet Logo](https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg)](https://www.postgresql.org/)
[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/)

## Introduction

Périmètre de l'application:

- Proposer au joueur de répondre à des questions.
- Il devra choisir parmi 4 réponses possibles.
- Chaque bonne réponse lui fait gagner 1 point.
- Chaque mauvaise réponse lui fait perdre 1 point.
- Afficher un classement des joueurs


Technologies:
- Java Spring Boot 2.3.3
- PostgreSQL 11.11
- NodeJS 16.15.0
- Angular 13.1.1


## Prérequis
Installer NodeJs, Npm et Angular
- Windows
Installer depuis https://nodejs.org/fr/download/
``` bash
npm install –g @angular/cli
``` 
- Linux
``` bash
sudo apt install nodejs npm
npm install –g @angular/cli
``` 

Installer Java 17
``` bash
https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
```

## Installation
Compiler et lancer le projet sous java 17

Angular:
```
cd ./frontend && npm install && npm run start
```

#### URLs:

| Url      | Details   | Compte Dev| Mot de passe
|----------|-----------|-----------|-----------|
|http://localhost:4200| Frontend Angular|alice|azerty
|http://localhost:8080/swagger-ui.html| Swagger|string|string
|http://localhost:8080/api| Api Java Spring|