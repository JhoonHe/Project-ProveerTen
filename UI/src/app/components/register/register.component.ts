import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import Provider from '../../interfaces/provider';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  provider: Provider = {} as Provider;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router) {
    this.form = this.fb.group({
      nit_provider: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      email_provider: ['', [Validators.email]],
      name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      name_company: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      city_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      password_provider: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      neighborhood: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      number_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider = {
        nit_provider: this.form.value.nit_provider,
        email_provider: this.form.value.email_provider,
        name_provider: this.form.value.name_provider,
        last_name_provider: this.form.value.last_name_provider,
        name_company: this.form.value.name_company,
        city_provider: this.form.value.city_provider,
        password_provider: this.form.value.password_provider,
        description_provider: this.form.value.description_provider,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number_street: this.form.value.number_street,
        number_provider: this.form.value.number_provider
      }
      console.log(this.provider);

      this.client.postRequest('http://localhost:5001/register/provider', this.provider).subscribe({
        next: (data: any) => {
          console.log(data);
          // localStorage.setItem('token', data.token);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => console.log('complete'),
      });
    }
  }
}
