import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser, Role } from '../../entities/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  roles = Object.values(Role);
  displayedColumns: string[] = ['firstName', 'phone', 'email', 'role', 'birthdate'];
  dataSource;

  totalUsers = 100;
  pageSize = 5;
  
  paginationBuf = { pageIndex: 0, limit: this.pageSize };
  filterBuf;

  form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private userServ: UserService,
    private snackBar: MatSnackBar,
    private auth: AngularFireAuth, 
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    const fb = new FormBuilder();
    this.form = fb.group({
      birthdate: null,
      role: null,
    });
    this.updateData();
  }

  onClearFilters() {
    this.form.reset();
    this.updateData();
  }

  updateData() {
    console.log('update users');
    this.userServ.getUsers(this.paginationBuf, this.filterBuf).then(data => this.dataSource = data);
    this.userServ.getUserTotal().then(n => {
      this.totalUsers = n
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((p: PageEvent) => {
      this.paginationBuf =
        p ? {
          pageIndex: p.pageIndex,
          limit: p.pageSize
        } :
          { pageIndex: 0, limit: this.pageSize }
      this.updateData();
    });

    this.form.valueChanges.subscribe(values => {
      this.paginator.pageIndex = 0;
      this.filterBuf = values ? Object.keys(values)
        .map(k => ({ field: k, value: values[k] }))
        .filter(o => o.value) : null
      this.updateData();
    })
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddUserComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(async (user: IUser) => {
      if (!user) return;
      try {
        await this.userServ.createUser(user);
        this.snackBar.open('User created', 'Close', {
          duration: 4000,
        });
        this.updateData();
      }
      catch (err) {
        this.snackBar.open(err.message, 'Close', {
          duration: 4000,
        });
      }
    });
  }
  
  async onLogout() {
    await this.auth.signOut();
    await this.router.navigateByUrl('');
  }
}
