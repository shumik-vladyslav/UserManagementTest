import { IUser, Role } from './../../entities/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  roles = Object.values(Role);
  form: FormGroup;
  hidePass = true;

  constructor() { }

  ngOnInit(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]],
      birthdate: ['', [Validators.required]],
      role: ['User', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
}
