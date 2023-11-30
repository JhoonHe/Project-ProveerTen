import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import Provider from '../../interfaces/provider';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  provider: Provider = {} as Provider;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private client: ClientService, private router: Router) {
    this.form = this.fb.group({
      email_provider: ['', [Validators.email]],
      password_provider: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider = {
        email_provider: this.form.value.email_provider,
        password_provider: this.form.value.password_provider,
      }

      this.client.postRequest('http://localhost:5001/login/provider', this.provider).subscribe({
        next: (data: any) => {
          console.log(data);
          localStorage.setItem('token', data.token);
        },
        error: (e: any) => {
          this.toastr.error(e.error.Status, '¡Error!');

        },
        complete: () => console.log('complete'),
      });
    } else {
      this.toastr.error('Verifique la información ingresada', '¡Error!');
    }
  }
}
