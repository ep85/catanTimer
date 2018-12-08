import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import {FcmService} from './fcm.service';
import { Toast } from '@ionic-native/toast/ngx';

const firebase = {
  apiKey: "AIzaSyDk99f8sPc3fwKupvcqVRCBhQ8hLsRTcNM",
  authDomain: "catan-timer.firebaseapp.com",
  databaseURL: "https://catan-timer.firebaseio.com",
  projectId: "catan-timer",
  storageBucket: "catan-timer.appspot.com",
  messagingSenderId: "163288971204"
 }
 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    Firebase,
    FcmService,
    Toast,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private backgroundMode: BackgroundMode) { 
    this.backgroundMode.enable();
  }
}
