import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  image1;
  image2;
  jsonObject;

  APITOKEN: string = "invalid token";

  verified: boolean = false;
  formData: FormData = new FormData();

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'appId': '2d9288',
      'appKey': '506505f70970ce16988f'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.formData.append('type', 'id')
  }

  onFile1Selected(event) {
    this.image1 = event.target.files[0];
    if (this.formData.has('image1')) { this.formData.delete('image1'); }
    this.formData.append('image1', this.image1);
  }

  onFile2Selected(event) {
    this.image2 = event.target.files[0];
    if (this.formData.has('image2')) { this.formData.delete('image2'); }
    this.formData.append('image2', this.image2);
  }

  getApiToken() {

    this.jsonObject = {
      method: "TOKEN",
    };

    this.http.post("https://eryijb6gz5.execute-api.eu-central-1.amazonaws.com/Prod/demo", this.jsonObject)
      .subscribe(data => {
        console.log(data)
      });
  }

  verifyUser() {
    this.http.post("https://apac.faceid.hyperverge.co/v1/photo/verifyPair", this.formData, this.httpOptions)
      .subscribe(data => {
        if (data.result.match == "yes") {
          this.verified = true;
          setTimeout(() => {
            this.router.navigateByUrl('/createaccount');
          }, 3000);
        }
      }
    );
  }

}


