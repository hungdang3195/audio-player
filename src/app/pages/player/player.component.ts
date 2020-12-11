import { Component, OnDestroy } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnDestroy {
  files: Array<any> = [];
  state: StreamState = {} as StreamState;
  currentFile: any = {};
  subcription: Subscription;
  constructor(private audioService: AudioService, cloudService: CloudService) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
      });
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  playStream(url: string) {
    const next = (value: any) => {
      return value;
    };
    const error = () => { };
    this.subcription =  this.audioService.playStream(url)
      .subscribe(next, error);
  }

  openFile(file: any, index: any) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: any) {
    this.audioService.seekTo(change.value);
  }
}
