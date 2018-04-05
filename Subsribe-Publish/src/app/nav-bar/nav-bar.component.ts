import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  public cateArray=[];
  public apiRoot='http://localhost:3000';
  public addCate(catValue){
    console.log(catValue);
    this.cateArray.push(catValue);
  }

  public saveData(){
    console.log('request to save the data');
    let url = `${this.apiRoot}/subscribe`;

    var temp=[];
    for(var i=0;i<this.cateArray.length;i++)
    {
        temp.push({"Topic":this.cateArray[i]});
    }

    var input_data={"categoryArray": temp};
    console.log(input_data);
    this.http.post(url,input_data).subscribe(res => {

    });
  }


  public publish(titelInput,cateInput,descInput){

    console.log('insdie publish');
    let url = `${this.apiRoot}/publish`;
    var input_data={"Name":titelInput,"Topic":cateInput,"Content":descInput};
    this.http.post(url,input_data).subscribe(res => {
    });

  }
  constructor(private http: Http) { }

  ngOnInit() {
  }

}
