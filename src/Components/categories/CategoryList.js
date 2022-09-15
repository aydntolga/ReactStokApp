import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";
import { MDBListGroup, MDBListGroupItem,MDBBadge } from "mdb-react-ui-kit";
class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id)
  };
  render() {
    return (
      <div>
        <h3><MDBBadge color='primary'>Categories</MDBBadge></h3>
        <MDBListGroup style={{ minWidthL: "22rem" }} light>
          {this.props.categories.map((category) => (
            <MDBListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() =>this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
