import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  hidePass = true;
  constructor(
    private auth: AngularFireAuth, 
    private router: Router,
    private snackBar: MatSnackBar,
    private userServ: UserService) { }

  ngOnInit(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async onLogin() {
    const { email, password } = this.form.value;
    try {
      const cred = await this.auth.signInWithEmailAndPassword(email, password);
      this.userServ.getUser(cred.user.uid)
      .then(
        () => this.router.navigateByUrl('user'),
      ).catch(
        err => this.showErr(err)
      )
    }
    catch (err) {
      this.showErr(err)
    }
  }

  showErr(err) {
    this.snackBar.open(err.message, 'Close' ,{
      duration: 4000,
    });
  }
}
