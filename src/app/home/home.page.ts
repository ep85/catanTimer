import { Component } from '@angular/core';
import { $ } from 'protractor';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig} from '@ionic-native/admob-free/ngx';
const iosAdmob="ca-app-pub-4450992604186564~5475860250";
const admobBanner="ca-app-pub-4450992604186564/7718880214";
const admobPopup="ca-app-pub-4450992604186564/9436437948";
/*mport {FcmService} from '../fcm.service';
import {ToastController } from '@ionic/angular';
import {tap} from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
*/
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
}) 
export class HomePage {
  constructor(private admobFree: AdMobFree) { 
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting:false,
      id: admobBanner,
     };
     this.admobFree.banner.config(bannerConfig);
     /*
     this.admobFree.banner.prepare()
       .then(() => {
        
         })
       .catch(e => console.log(e)); 
       */
  }
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
  played=0;
  popUpAd(){
    const popupConfig: AdMobFreeInterstitialConfig = {
      isTesting:false,
      id: admobPopup,
     };
     this.admobFree.interstitial.config(popupConfig);
      this.admobFree.interstitial.prepare()
       .then(() => {
        
         })
       .catch(e => console.log(e)); 
  }

  startTimer(){
    if(this.played==4){
      this.popUpAd();
      this.played=0;
    }
    this.played++;
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
    //this.admobFree.banner.show();
  }
}
