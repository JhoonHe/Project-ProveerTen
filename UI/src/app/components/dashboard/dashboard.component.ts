import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role!: string;

  constructor(private client: ClientService) {

  }

  ngOnInit(): void {
    this.client.getRequest('http://localhost:10101/test', undefined, { "Authorization": `Bearer ${localStorage.getItem("token")}` }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.role = data.rolToken;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => console.log('complete'),
    });
  }

}
