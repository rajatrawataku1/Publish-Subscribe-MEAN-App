import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public dataArray=[];
  public cateArray=[];
  public apiRoot='http://localhost:3000';
  public selectedStatus=[];
  public cate_Input_Form=''
  public yo=['rajat','rawat'];
  public cateSelected=[];

 addCate(value){
    this.cateArray.push(value);
  }

  public CategoryData=[
    {"name":"Cricket"},
    {"name":"Hey"}
  ]

  public SelectedArray=
    {"Cricket":"not_selected","Hey":"not_selected"}



  public saveData(){
    console.log('request to save the data');
    let url = `${this.apiRoot}/subscribe`;

    var keys = Object.keys(this.SelectedArray);

    for(var i=0;i<keys.length;i++)
    {
      if(this.SelectedArray[keys[i]]=='selected')
      {
        this.cateArray.push(keys[i]);
      }
    }

    var temp=[];
    for(var i=0;i<this.cateArray.length;i++)
    {
        temp.push({"Topic":this.cateArray[i]});
    }

    var input_data={"categoryArray": temp};
    console.log(input_data);
    this.http.post(url,input_data).subscribe(res => {
        $('#modal1').modal('close');
        Materialize.toast('Subscribed !!!! ',4000)
        this.getData();
        this.cateArray=[];
    });
  }


  public getData(){
    let url = `${this.apiRoot}/getData`;
    this.http.get(url).subscribe(res => {
      console.log(res._body)
      if(res._body.length!=0)
      {
        this.dataArray=JSON.parse(res._body);
      }else{
        this.dataArray=[];
      }
    });
  }

  public onSubmit(){
    console.log('submit is clicked');
    console.log(form.controls['selectedTechs'].value);
  }

  public changeStat(cate){

    if(this.SelectedArray[cate]=="not_selected")
    {
      this.SelectedArray[cate]="selected";
    }else{
      this.SelectedArray[cate]="not_selected";
    }

    // for(var i=0; i<this.SelectedArray.length;i++)
    // {
    //   if(this.SelectedArray[i][cate]!=undefined)
    //   {
    //     console.log(this.SelectedArray[i][cate]);
    //     if(this.SelectedArray[i][cate]=="not_selected"){
    //       console.log('hey');
    //       this.SelectedArray[i][cate]="selected";
    //       break;
    //     }else{
    //       this.SelectedArray[i][cate]="not_selected";
    //       break;
    //     }
    //   }
    // }
    console.log(this.SelectedArray);
  }

  public getClassInput(cate){

    if(this.SelectedArray[cate]=="not_selected"){
        return false;
    }else{
      return true;
    }
  }

  constructor(private http: Http) { }

  ngOnInit() {
    this.getData();
  }

}
