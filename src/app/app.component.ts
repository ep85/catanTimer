import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './fcm.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message:message,
      duration: 5000,
      position:'top',
      showCloseButton:true,
      closeButtonText:"dismiss"
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();

    this.fcm.listenToNotifications().subscribe(
      (msg) => {
        console.log("MESSAGE IN:");
        console.log(msg);
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert.body);
        } else {
          this.presentToast(msg.body);
        }
      });
  }
  initializeApp() {
    console.log("APP OPENED")
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
}
