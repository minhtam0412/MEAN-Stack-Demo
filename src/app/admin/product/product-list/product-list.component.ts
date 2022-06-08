import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Product} from "../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  getProduct = gql`
  query {
    products {
      products {
        _id
        name
        description
        price
        discount
        created_at
        updated_at
      }
    }
  }`;

  lstProduct: Product[] = [];

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({query: this.getProduct}).valueChanges.subscribe(value => {
      this.lstProduct = value.data.products.products as Product[];
    });
  }
}
