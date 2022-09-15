import React, { Component } from "react";
import {
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { connect } from "react-redux";
import { Badge } from "reactstrap";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";

class CartSummary extends Component {
  renderEmpty() {
    return MDBDropdownItem > <MDBDropdownItem>Empty Cart</MDBDropdownItem>;
  }

  renderSummary() {
    return (
      <MDBNavbarItem>
        <MDBDropdown>
          <MDBDropdownToggle tag="a" className="nav-link">
            Sepet
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {this.props.cart.map((cartItem) => (
              <MDBDropdownItem key={cartItem.product.id} link>
                <Badge
                  color="danger"
                  onClick={() =>
                    this.props.actions.RemoveFromCart(cartItem.product)
                  }
                >
                  X
                </Badge>
                {cartItem.product.productName}
                <Badge color="success">{cartItem.quantity}</Badge>
              </MDBDropdownItem>
              
            ))}
              <MDBDropdownItem divider></MDBDropdownItem>
             <MDBDropdownItem><Link to="/cart">Sepete Git</Link></MDBDropdownItem> 
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavbarItem>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
