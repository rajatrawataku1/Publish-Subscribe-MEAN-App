import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  public apiRoot='http://localhost:3000';

  public publish(titelInput,cateInput,descInput){

    console.log('insdie publish');
    let url = `${this.apiRoot}/publish`;
    var input_data={"Name":titelInput,"Topic":cateInput,"Content":descInput};
    this.http.post(url,input_data).subscribe(res => {
      // $('#modal2').modal('close');
      // Materialize.toast('Published !!!! ',4000)

    });

  }
  constructor(private http: Http) { }

  ngOnInit() {
  }

}
