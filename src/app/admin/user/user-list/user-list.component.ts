import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Product} from "../../product/model/product";
import {environment} from "../../../../environments/environment";
import CONSTANT from "../../../_helpers/constant/contants";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  getUserById = gql`
  query{
    user(id:2){
      id
      name
      email
    }
  }
  `;

  user: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.use(CONSTANT.POSTGRES_GRAPHQL_NAME).watchQuery<any>({
      query: this.getUserById,
    }).valueChanges.subscribe({
      next: value => {
        console.log("-> value", value);
        this.user = value.data.user;
      }, error: err => {
        console.log(err);
      }
    });
  }
}
