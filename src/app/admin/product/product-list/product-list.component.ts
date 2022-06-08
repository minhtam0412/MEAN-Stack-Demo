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
    getAllProduct {
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

  deleteProduct = gql`
  mutation($productId: ID!) {
    deleteProduct(id:$productId) {
      _id
      name
      description
      price
      discount
      created_at
      updated_at
    }
  }
`;

  lstProduct: Product[] = [];
  loading: boolean = true;

  constructor(private apollo: Apollo, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    this.loading = true;
    this.apollo.watchQuery<any>({query: this.getProduct, fetchPolicy: 'network-only'}).valueChanges.subscribe({
      next: value => {
        if (value.data) {
          this.loading = value.loading;
          this.lstProduct = value.data.getAllProduct.products as Product[];
        }
      }, error: err => {
        console.log(err);
        this.toastr.error('Lỗi tìm kiếm thông tin!');
      }
    });
  }

  delete(_id: string) {
    this.apollo.mutate({
      mutation: this.deleteProduct, variables: {
        productId: _id
      }
    }).subscribe({
      next: value => {
        this.loadData();
      }, error: err => {
        console.log(err)
      }
    });
  }
}
