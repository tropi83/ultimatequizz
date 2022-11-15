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
import { HistoryService } from "../../core/history/history.service";
import { Quizz } from "../../core/quizz/quizz.models";
import { Question } from "../../core/question/question.models";
import { Answer } from "../../core/answer/answer.types";
import { FuseConfirmationService } from "../../../@fuse/services/confirmation";
import { FlashService } from "../flash/flash.service";
import { User } from "../../core/user/user.types";

@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls  : ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit, AfterViewInit{

    @Input() quizz: Quizz;
    @Input() user: User;
    @Output() gameMode = new EventEmitter<boolean>();

    //player: Player
    quizzIsStarted: boolean = false;
    countDownIsStarted: boolean = false;
    answers: Answer[];
    question: Question;
    questions: Question[];

    points: number = 0;
    time: number = 0;
    interval;
    fails: number = 0;
    correctPosition: number = 0;
    answerPosition: number = 0;
    pause: boolean = false;
    success : boolean = true;
    progress: number = 0;

    savedOriginalAnswers: Answer[];
    savedOriginalQuestion: Question;
    savedOriginalQuestions: Question[];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        private route: ActivatedRoute,
        private quizzService: QuizzService,
        private historyService: HistoryService,
        private _location: Location,
        private _fuseConfirmationService: FuseConfirmationService,
        private _flashService: FlashService
    ) { }


    ngOnInit() {
        this.question = this.quizz.questions[0];
        this.questions = this.quizz.questions;

        this.savedOriginalQuestion = this.quizz.questions[0];
        this.savedOriginalQuestions = this.quizz.questions;
        this.setAnswers();
        this._changeDetectorRef.markForCheck();
    }

    /**/
    ngAfterViewInit() {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = "var ml4 = { opacityIn: undefined, scaleIn: undefined, scaleOut: undefined, durationIn: undefined, durationOut: undefined, delay: undefined }; ml4.opacityIn = [0,1]; ml4.scaleIn = [0.2, 1]; ml4.scaleOut = 3; ml4.durationIn = 600; ml4.durationOut = 500; ml4.delay = 400; anime.timeline({loop: false}) .add({ targets: '.ml4 .letters-1', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-1', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-2', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-2', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-3', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-3', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4 .letters-4', opacity: ml4.opacityIn, scale: ml4.scaleIn, duration: ml4.durationIn }).add({ targets: '.ml4 .letters-4', opacity: 0, scale: ml4.scaleOut, duration: ml4.durationOut, easing: \"easeInExpo\", delay: ml4.delay }).add({ targets: '.ml4', opacity: 0, duration: 500, delay: 500 });";
        this.elementRef.nativeElement.appendChild(script);
    }



    /**
     * Update progress quizz
     */
    updateProgress(){
        this.progress = ((this.question.position) / (this.questions.length)) * 100;

        if(this.progress === 100) {
            this.displayEndOfGame();
        }
    }

    /**
     * Display end of game
     */
    displayEndOfGame() {

        this.pauseTimer()

        // Add history
        this.historyService.createHistory(this.points, this.time, this.quizz.id)
            .subscribe(
                () => {
                },
                (error) => {
                },
                () => {

                    // Open the confirmation dialog
                    const confirmation = this._fuseConfirmationService.open({
                        title       : 'Quizz terminé !',
                        message     : 'Score: ' + this.points,
                        dismissible : true,
                        icon        : {
                            show : true,
                            name : 'heroicons_solid:shield-check',
                            color: 'primary'
                        },
                        actions     : {
                            confirm: {
                                show : true,
                                label: 'Quitter',
                                color: 'primary'
                            },
                            cancel : {
                                show : true,
                                label: 'Recommencer'
                            }
                        }
                    });

                    // Subscribe to the confirmation dialog closed action
                    confirmation.afterClosed().subscribe(async (result) => {

                        // If the confirm button pressed...
                        if ( result === 'cancelled' )
                        {
                            await this.restartQuizzGame();
                        }
                    });

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                }
            );
    }


    /**
     * Update the score
     */
    updatePointScore() {
        if(this.success){
            this.points = this.points + 1;
        } else {
            this.points = this.points - 1;
        }
        this._changeDetectorRef.markForCheck();
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

        if(this.pause) {

            if(this.success && this.progress !== 100) {
                this._flashService.successQuiz('Correcte');
            }
            else if(!this.success) {
                this._flashService.failQuiz('Mauvaise réponse !');
            }
            else if(!this.success && this.progress === 100) {
                this._flashService.successQuiz('Vous avez gagné !');
            }
        }

        this.updatePointScore();

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

        let arrayAnswers: Array<Answer> = [];
        if(typeof this.question.answers[2] !== 'undefined' && typeof this.question.answers[3] !== 'undefined') {
            arrayAnswers.push({ id: 1, label: this.question.answers[0].label, isCorrect: this.question.answers[0].isCorrect, question: this.question});
            arrayAnswers.push({ id: 2, label: this.question.answers[1].label, isCorrect: this.question.answers[1].isCorrect, question: this.question});
            arrayAnswers.push({ id: 3, label: this.question.answers[2].label, isCorrect: this.question.answers[2].isCorrect, question: this.question});
            arrayAnswers.push({ id: 4, label: this.question.answers[3].label, isCorrect: this.question.answers[3].isCorrect, question: this.question});
        }
        else if(typeof this.question.answers[2] !== 'undefined' && typeof this.question.answers[3] === 'undefined') {
            arrayAnswers.push({ id: 1, label: this.question.answers[0].label, isCorrect: this.question.answers[0].isCorrect, question: this.question});
            arrayAnswers.push({ id: 2, label: this.question.answers[1].label, isCorrect: this.question.answers[1].isCorrect, question: this.question});
            arrayAnswers.push({ id: 3, label: this.question.answers[2].label, isCorrect: this.question.answers[2].isCorrect, question: this.question});
        }
        else if(typeof this.question.answers[2] === 'undefined' && typeof this.question.answers[3] === 'undefined') {
            arrayAnswers.push({ id: 1, label: this.question.answers[0].label, isCorrect: this.question.answers[0].isCorrect, question: this.question});
            arrayAnswers.push({ id: 2, label: this.question.answers[1].label, isCorrect: this.question.answers[1].isCorrect, question: this.question});
        }


        // Shuffle array
        let currentIndex = arrayAnswers.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arrayAnswers[currentIndex];
            arrayAnswers[currentIndex] = arrayAnswers[randomIndex];
            arrayAnswers[randomIndex] = temporaryValue;
        }

        // Set correct answer position
        this.correctPosition = arrayAnswers.findIndex(x => x.id === 1);

        this.answers = arrayAnswers;
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

            this.startTimer();

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
     * ReStart Quiz game
     */
    async restartQuizzGame() {

        this.answers = this.savedOriginalAnswers;
        this.question = this.savedOriginalQuestion;
        this.questions = this.savedOriginalQuestions;
        this.time = 0;
        this.points = 0;
        this.fails = 0;
        this.correctPosition = 0;
        this.answerPosition = 0;
        this.pause = false;
        this.success = true;
        this.progress = 0;

        this.setAnswers();
        this._changeDetectorRef.markForCheck();

        await this.startQuizzGame();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Sleep/Wait function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Show Quiz history by quizz and user
     */
    showHistory(){

        // Add history
        this.historyService.getAllByUserIdAndQuizzId(this.user.id, this.quizz.id)
            .subscribe(
                (histories) => {

                    // Open the confirmation dialog
                    this._fuseConfirmationService.open({
                        title           : 'Historique',
                        message         : '',
                        isHistory       : true,
                        historiesData   : histories,
                        dismissible     : true,
                        icon       : {
                            show : true,
                            name : 'heroicons_solid:archive',
                            color: 'primary'
                        },
                        actions    : {
                            confirm: {
                                show : true,
                                label: 'Quitter',
                                color: 'primary'
                            },
                            cancel: {
                                show : false,
                                label: 'Quitter'
                            }
                        }
                    });

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                }
            );

    }

    /**
     * Tranform/format to 'mm:ss'
     */
    transformTime(value: number): string {
        const minutes: number = Math.floor(value / 60);



        return minutes + ':' + (value - minutes * 60);
    }

    /**
     * Counts the seconds elapsed
     */
    startTimer() {
        this.interval = setInterval(() => {

            console.log(this.time )

            if (this.time === 0) {
                this.time++;
            } else {
                this.time++;
            }

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 1000);
    }

    /**
     * Pause the timer
     */
    pauseTimer() {
        clearInterval(this.interval);
    }

}
