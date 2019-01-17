import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  banks: any = [{}];
  message = "Please fill all fields"

  accountJson = {
    "accountClosingDate": "2019-12-17T07:02:46.394Z",
    "accountCurrency": "GBP",
    "accountIdentification": "10037610000",
    "accountName": "",
    "accountOpeningDate": "2019-01-17T07:02:46.394Z",
    "accountRefNumber": "XXXX",
    "accountTypeId": 1029,
    "balance": 30000,
    "bankId": 0,
    "branchId": 10000268,
    "cardFacility": "N",
    "chequeBookFacility": "Y",
    "creditDebitIndicator": "Credit",
    "creditLineAmount": 0,
    "creditLineIncluded": "Y",
    "creditLineType": "Pre_Agreed",
    "frozen": "N",
    "isJointAccount": "N",
    "isOnlineAccessEnabled": "Y",
    "makerDate": "2019-01-17T07:02:46.394Z",
    "makerId": "1",
    "nickName": "",
    "noCredit": "Y",
    "noDebit": "Y",
    "passBookFacility": "Y",
    "productId": 1001,
    "schemeName": "SortCodeAccountNumber",
    "secondaryIdentification": "A6R99Z",
    "status": "ACTIVE",
    "typeOfBalance": "ClosingAvailable"
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    let httpObject = { method: "getBanks" };

    this.http.post('https://eryijb6gz5.execute-api.eu-central-1.amazonaws.com/Prod/demo', httpObject).subscribe(data => {
      this.banks = data;
    }
    );
  }

  marked = false;

  cardFacility(event) {
    this.marked = event.target.checked;

    if (this.marked == true) {
      this.accountJson.cardFacility = "Y";
    }
    else {
      this.accountJson.cardFacility = "N";
    }
  }

  onOptionsSelected(event) {
    this.accountJson.bankId = this.banks[event].bankId;
  }

  getAccountvalues() {    

    let boo = true;

    this.accountJson.accountIdentification = this.accountJson.accountIdentification + (Math.floor(Math.random() * 999) + 1);

    console.log(this.accountJson.accountIdentification);

    if (this.accountJson.accountName === '') {
      console.log("Account name cannot be empty");
      boo = false;
    }

    if (this.accountJson.nickName === '') {
      console.log("Nickname cannot be empty");
      boo = false;
    }

    if (this.accountJson.bankId === 0) {
      console.log("Bank not selected");
      boo = false;
    }

    if (boo === true) {

      this.message = "Creating..."

      let httpObject = { "method": "createAccount", "account": this.accountJson };
      this.http.post('https://eryijb6gz5.execute-api.eu-central-1.amazonaws.com/Prod/demo', httpObject).subscribe(data => {
        if (data != null) {
          this.message = "Account Successfully Created";
        } else {
          this.message = "Account Creation Failed";
        }
      }
      );
    }

    this.accountJson.accountIdentification = "10037610000";
  }


}
