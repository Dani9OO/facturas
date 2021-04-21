import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../_services/data.service';

interface LoginInterface {
  user: string;
  pass: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  user = new FormControl('', []);
  pass = new FormControl('', [
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      user: this.user,
      pass: this.pass
    });
  }

  ngOnInit(): void {
  }

  async login(form: LoginInterface): Promise<void> {
    const result = await this.dataService.login(form.user, form.pass);
    console.log(result);
    if (result instanceof Error) this._snackBar.open(result.message, 'Error', { duration: 2000 });
    if (typeof result === 'string') this._snackBar.open(result, '✓', { duration: 2000 });
  }

}
