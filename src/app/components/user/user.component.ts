import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../entities/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone number', 'email-address', 'role', 'birthdate'];
  data: MatTableDataSource<IUser>;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAdd() {
    console.log('on add')
    const dialogRef = this.dialog.open(AddUserComponent,{width: '400px'});

    dialogRef.afterClosed().subscribe((user:IUser) => {
      console.log(`Dialog result`,user);
    });
  }
}
