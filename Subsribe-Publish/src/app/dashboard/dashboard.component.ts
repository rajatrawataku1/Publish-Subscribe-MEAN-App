import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public dataArray=[];
  public apiRoot='http://localhost:3000';

  public getData(){
    let url = `${this.apiRoot}/getData`;
    this.http.get(url).subscribe(res => {
      console.log(res._body)
      this.dataArray=JSON.parse(res._body);
    });
  }

  constructor(private http: Http) { }

  ngOnInit() {
    this.getData()
  }

}
