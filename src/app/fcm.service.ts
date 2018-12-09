import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor( 
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    public platform: Platform
  ){}
  async getToken(){
    let token;
    if(this.platform.is('android')){
      token=await this.firebaseNative.getToken()
    }
    if(this.platform.is('ios')){
      token=await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    if(!this.platform.is('cordova')){
      //for Broswer Figuere it out
    }
    return this.saveTokenToFirestore(token);
  }
  private saveTokenToFirestore(token){
    if(!token) return;
    const devicesRef= this.afs.collection('devices')
    const docData={
        token,
        userId: 'testUser2'
    }
    return devicesRef.doc(token).set(docData);
  }
  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }
}
