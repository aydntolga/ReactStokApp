import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MDBBadge } from "mdb-react-ui-kit";
import * as productActions from "../../redux/actions/productActions";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import {Link} from 'react-router-dom'



class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }

  addToCart= (product)=>{
    this.props.actions.addToCart({quantity:1,product})
    alertify.success(product.productName + " added to cart")
  }

  render() {
    return (
      <div>
        <h5>
          <MDBBadge color="primary">Products</MDBBadge>
          <MDBBadge color="danger">
            {this.props.currentCategory.categoryName}
          </MDBBadge>

          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity Per Unit</th>
                <th scope="col">Units In Stock</th>
                <th></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.props.products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td><Link to={"/saveproduct/"+product.id}>{product.productName}</Link></td>
                  <td>{product.unitPrice}</td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitsInStock}</td>
                  <td>
                  <button onClick={()=>this.addToCart(product)} type="button" class="btn btn-info">Add</button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </h5>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
