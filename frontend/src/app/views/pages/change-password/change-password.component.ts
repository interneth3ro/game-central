import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../store/auth/selectors';
import { CurrentUser } from '../../../store/auth/state';
import { AuthService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });

  public currentUser: CurrentUser | null = null;
  changePasswordFailed: boolean = false;

  constructor(
    private router: Router,
    private readonly store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectCurrentUser)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  changePassword() {
    const payload = {
      email: this.currentUser?.email,
      oldPassword: this.changePasswordForm.get('oldPassword')?.value,
      newPassword: this.changePasswordForm.get('newPassword')?.value,
    };

    this.authService.changePassword(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.changePasswordFailed = true;
      },
    });
  }
}
