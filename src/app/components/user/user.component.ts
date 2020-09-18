import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../entities/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit,OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'phone number', 'email-address', 'role', 'birthdate'];
  dataSource: MatTableDataSource<IUser>;
  
  constructor(
    private dialog: MatDialog,
    private userServ: UserService,
    private snackBar: MatSnackBar,
    ) {}

  ngOnInit():void {
    // this.paginator.length = 100;
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((p: PageEvent) => {
      console.log('pageEvent', p);
    });
    this.sort.sortChange.subscribe((s: Sort) => {
      console.log('sort', s);
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddUserComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(async (user: IUser) => {
      if (!user) return;
      console.log(`Dialog result`, user);
      try {
        await this.userServ.create(user);
        this.snackBar.open('User created', 'Close' ,{
          duration: 4000,
        });
      }
      catch (err) {
        console.log(err);
        this.snackBar.open(err.message, 'Close' ,{
          duration: 4000,
        });
      }
    });
  }
}
