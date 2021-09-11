import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.http.get<any []>('https://devdactic.fra1.digitaloceanspaces.com/gmail/data.json')
    .subscribe(res => {
    this.emails = res.map(email => {
      email.color = this.intToRgb(this.hashCode(email.from));
      return email;
    });
    console.log(res);
    });
  }

  openDetails(id) {
    this.router.navigate([
      'tabs', 'mail', id
    ]);
  }

  async openAccount(ev) {
    const popover = await this.popoverCtrl.create({
      component: AccountPage,
      event: ev,
      cssClass: 'custom-popover'
    });
    await popover.present();
  }

  doRefresh(ev) {
    setTimeout( () => {
      ev.target.complete();
    }, 200);
  }

  private hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // eslint-disable-next-line no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRgb(i) {
    // eslint-disable-next-line no-bitwise
    const c = (i & 0x00ffffff)
    .toString(16)
    .toUpperCase();

    return '#' + '0000'.substring(0, 6 -c.length) + c;
  }
}
