import {
    Component,
    Input,
    OnInit,
    EventEmitter,
    Output,
    ElementRef,
    ChangeDetectorRef,
    AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QuizzService } from "../../core/quizz/quizz.service";
//import { HistoryQuizzService } from "../../core/history-quizz/history-quizz.service";

import { Quizz } from "../../core/quizz/quizz.models";
import { Question } from "../../core/question/question.models";
import { Answer } from "../../core/answer/answer.types";
//import { Player } from '../../model/player';

@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls  : ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit{

    @Input() quizz: Quizz;
    @Output() gameMode = new EventEmitter<boolean>();

    //player: Player
    quizzIsStarted: boolean = false;
    countDownIsStarted: boolean = false;
    answers: Answer[];
    question: Question;
    questions: Question[];

    points: number = 0;
    fails: number = 0;
    correctPosition: number = 0;
    answerPosition: number = 0;
    pause: boolean = false;
    success : boolean = true;
    progress: number = 0;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        private route: ActivatedRoute,
        private quizzService: QuizzService,
        //private historyQuizzService: HistoryQuizzService,
        private _location: Location
    ) { }


    ngOnInit() {
        this.question = this.quizz.questions[0];
        this.questions = this.quizz.questions;
        this.setAnswers();

    }

    /*
    ngAfterViewInit() {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = "var ml4 = { opacityIn: undefined, scaleIn: undefined, scaleOut: undefined, durationIn: undefined, durationOut: undefined, delay: undefined }; ml4.opacityIn = [0,1]; ml4.scaleIn = [0.2, 1]; ml4.scaleOut = 3; ml4.durationIn = 600; ml4.durationOut = 500; ml4.delay = 400; anime.timeline({loop: false}) .add({ targets: '.ml4 .letters-1', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-1', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-2', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-2', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-3', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-3', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-4', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-4', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4', opacity: 0, duration: 500, delay: 500 });";
        this.elementRef.nativeElement.appendChild(script);
    }

     */
  /*
  // Get player
  getPlayer(id: string): void {
    this.playerService.getPlayer(id)
      .subscribe(player => {
        this.player = player
      });
  }

  // Update player score
  updateScore(): void {
    this.playerService.updatePlayer(this.player)
      .subscribe();
  }
   */

    /**
     * Update progress bar
     */
    updateProgress(){
        this.progress = ((this.question.position) / (this.questions.length)) * 100;
    }

    /**
     * Display the correct answer
     */
    displayAnswer(index: number){
        if (!this.pause) {
            this.updateProgress();
            this.answerPosition = index;

            if (index!=this.correctPosition) {
                this.success = false;
            }
            this.pause = true;
        }
    }

    /**
     * Go to the next question
     */
    goNext(){

        if (this.question.position < this.questions.length) {
            this.question = this.questions.find(q => q.position == this.question.position + 1);
            this.setAnswers();
            this.pause = false;
        } else {
            if(this.success){
            /*
            if (!this.player.completed.includes(this.quizz.id)) {
                console.log("Updating score")
                this.player.completed.push(this.quizz.id)
                this.updateScore()
            }
            */
            }
        }
    }

    /**
     * Set answers
     */
    setAnswers(){
        let array = [
            { id: 1, label: this.question.answers[0].label, isCorrect: this.question.answers[0].isCorrect, question: this.question},
            { id: 2, label: this.question.answers[1].label, isCorrect: this.question.answers[1].isCorrect, question: this.question},
            { id: 3, label: this.question.answers[2].label, isCorrect: this.question.answers[2].isCorrect, question: this.question},
            { id: 4, label: this.question.answers[3].label, isCorrect: this.question.answers[3].isCorrect, question: this.question},
        ];

        // Shuffle array
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        // Set correct answer position
        this.correctPosition = array.findIndex(x => x.id === 1);

        this.answers = array;
    }

    /**
     * Close Quiz game and return to list
     */
    backToQuizzList(){
        this.gameMode.emit(false);
    }

    async resetCountDown() {
        //if (this.countDownIsStarted === false) {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.textContent = "var ml4 = { opacityIn: undefined, scaleIn: undefined, scaleOut: undefined, durationIn: undefined, durationOut: undefined, delay: undefined }; ml4.opacityIn = [0,1]; ml4.scaleIn = [0.2, 1]; ml4.scaleOut = 3; ml4.durationIn = 600; ml4.durationOut = 500; ml4.delay = 400; anime.timeline({loop: false}) .add({ targets: '.ml4 .letters-1', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-1', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-2', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-2', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-3', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-3', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-4', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-4', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4', opacity: 0, duration: 500, delay: 500 });";
            //script.textContent += "if (typeof ml4 !== 'undefined') {ml4.reset();}";
            this.elementRef.nativeElement.appendChild(script);
            this._changeDetectorRef.markForCheck();
            await this.sleep(2000);
            await this.resetCountDown();
        //}
    }


    /**
     * Start Quiz game
     */
    async startQuizzGame() {
        if(this.quizzIsStarted === false){
            this.quizzIsStarted = true;
            this.countDownIsStarted = true;
            this._changeDetectorRef.markForCheck();

            console.log('before ')
            //await this.sleep(5000);
            this.countDownIsStarted = false;
            this._changeDetectorRef.markForCheck();
            console.log('after ')
        }
    }

    /**
     * Sleep/Wait function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
