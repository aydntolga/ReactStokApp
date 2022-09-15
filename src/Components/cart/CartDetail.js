import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

class CartDetail extends Component {

    removeFromCart(product){
        this.props.actions.removeFromCart(product);
    }

  render() {
    return (
      <div>
    
    <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>

                <th></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.props.cart.map((cartItem) => (
                <tr key={cartItem.product.id}>
                  <th scope="row">{cartItem.product.id}</th>
                  <td>{cartItem.product.productName}</td>
                  <td>{cartItem.product.unitPrice}</td>
                  <td>{cartItem.product.quantity}</td>
                  <td>
                  <button onClick={()=>this.removeFromCart(cartItem.product)} type="button" class="btn btn-danger">Remove</button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>




      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
    return {
      actions: {
        RemoveFromCart: bindActionCreators(cartActions.RemoveFromCart, dispatch),
      },
    };
  }
  
  function mapStateToProps(state) {
    return {
      cart: state.cartReducer,
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
  