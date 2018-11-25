import { Component } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
}) 
export class HomePage {
  slow=90;
  medium=75;
  fast=60;
  speedy=45;
  setSpeed=this.slow;
  timeoutSeconds=this.setSpeed;
  minutes=Math.floor(this.timeoutSeconds / 60 );;
  seconds=this.timeoutSeconds-this.minutes*60;
  countDown=this.minutes+"m "+this.seconds+"s"
  interval=null;
  paused=true;
  pauseText="Start"
  halfWaySounds
  timeUp
  lastSeconds
  buttonClick
  startTimer(){
    this.pauseText="Stop"
    this.paused=false;
    this.interval=setInterval(() =>{
      if(this.timeoutSeconds==0){
        this.timerEnded();
        this.pauseTimer();
      }
      if(this.timeoutSeconds == 15 ){
        this.playAudio(this.lastSeconds,4);
    }
      if(this.timeoutSeconds == Math.round(this.setSpeed/2) ){
          this.playAudio(this.halfWaySounds,4);
      }
      this.minutes=Math.floor(this.timeoutSeconds / 60 );
      this.seconds= this.timeoutSeconds-this.minutes*60;
      this.countDown=this.minutes+"m "+this.seconds+"s"
      this.timeoutSeconds--;
    },1000)
  }
  setUpAudio(){
    this.halfWaySounds=new Audio("assets/sounds/half-way.mp3");
    this.lastSeconds=new Audio("assets/sounds/lastSeconds.mp3");
    this.timeUp= new Audio("assets/sounds/timeUp.mp3");
    this.buttonClick= new Audio("assets/sounds/tick.mp3");
  }
  playAudio(sound,time){
    sound.play();
    setTimeout(function(){
        sound.pause();
    }, time *1000);
  }
  timerEnded(){
    this.playAudio(this.timeUp,5);
  }
  timerChange(){
    var x = document.getElementsByClassName("countDownTimer");
    x[0].classList.add("countDownTimerBigger");
    setTimeout(function(){
      x[0].classList.remove("countDownTimerBigger");;
    }, 200);
  }
  stopButton(){
    this.paused=!this.paused;
    if(this.paused==true){
      this.pauseText="Start"
      this.pauseTimer();
    }else{
      this.pauseText="Stop"
      this.timerChange();
      this.startTimer();
    }
  }
  pauseTimer(){
    clearInterval(this.interval);
  }
  reset(){
    this.pauseTimer();
    this.timeoutSeconds=this.setSpeed;
    this.startTimer();
  }
  changeSpeed(speed){
    this.playAudio(this.buttonClick,2)
    this.pauseTimer();
    this.setSpeed=speed;
    this.timeoutSeconds=this.setSpeed;
    this.timerChange();
    this.startTimer();
  }
  ngOnInit(){
      this.setUpAudio();
  }
}
