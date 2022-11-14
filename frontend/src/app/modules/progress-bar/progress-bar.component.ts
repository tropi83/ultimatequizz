import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: number;

  constructor() { }

  ngOnInit(): void {
  }

}
