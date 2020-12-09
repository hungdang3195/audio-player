import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  state: any;
  currentFile: any = {};

  files: Array<any> = [
    { name: 'First Song', artist: 'Inder' },
    { name: 'Second Song', artist: 'You' }
  ];

  isFirstPlaying(): boolean {
    return false;
  }
  isLastPlaying(): boolean {
    return true;
  }

  next(): void {

  }
  pause(): void {

  }
  play(): void {

  }

  previous(): void {

  }

  onSliderChangeEnd(event: unknown): void {

  }

  openFile(file: unknown, index: unknown): void {

  }

  constructor() { }

  ngOnInit(): void {
  }

}
