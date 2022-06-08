import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  myform: FormGroup = new FormGroup({});
  getProductQuery = gql`
  query($productId: ID!) {
    product(id: $productId) {
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

  updateProduct = gql`
  mutation($productId: ID!, $input: ProductInputData) {
    updateProduct(id: $productId, productInput: $input) {
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

  createProduct = gql`
  mutation($input: ProductInputData){
    createProduct(productInput: $input){
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

  id: string | null = null;

  constructor(public fb: FormBuilder, private actRoute: ActivatedRoute, private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log("-> id", this.id);
    this.myform = this.fb.group({
      name: [''],
      description: [''],
      price: [null],
      discount: [null],
    });
    if (this.id) {
      this.getProduct();
    }
  }

  onSubmit() {
  }

  getProduct() {
    this.apollo.watchQuery<any>({
      query: this.getProductQuery,
      variables: {
        productId: this.id
      }
    })
      .valueChanges
      .subscribe(({data, loading}) => {
        const product = data['product'];
        if (product) {
          this.myform.setValue({
            name: product['name'],
            description: product['description'],
            price: product['price'],
            discount: product['discount'],
          });
        }
      });
  }

  saveData() {
    if (this.id) {
      this.apollo.mutate({
        mutation: this.updateProduct,
        variables: {
          productId: this.id,
          input: {
            name: this.myform.value['name'],
            description: this.myform.value['description'],
            price: Number(this.myform.value['price']),
            discount: Number(this.myform.value['discount']),
          }
        }
      }).subscribe(value => {
        console.log('value', value);
      });
    } else {
      this.apollo.mutate({
        mutation: this.createProduct,
        variables: {
          input: {
            name: this.myform.value['name'],
            description: this.myform.value['description'],
            price: Number(this.myform.value['price']),
            discount: Number(this.myform.value['discount']),
          }
        }
      }).subscribe(value => {
        console.log(value)
      });
    }
  }
}
