import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../entities/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data: MatTableDataSource<User>;
  constructor() { }

  ngOnInit(): void {
  }

}
