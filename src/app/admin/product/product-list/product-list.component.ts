import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Product} from "../model/product";
import {ToastrService} from "ngx-toastr";

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

  constructor(private apollo: Apollo, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    console.log('loadData');
    this.apollo.query<any>({query: this.getProduct, fetchPolicy: 'network-only'}).subscribe(value => {
      if (value.data) {
        this.lstProduct = value.data.products.products as Product[];
      }
    }, error => {
      console.log(error)
      this.toastr.error('Lỗi tìm kiếm thông tin!');
    });
  }
}
