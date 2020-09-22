import React, { Component } from "react";
import classes from "./Topbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./Topbar.css";
class Topbar extends Component {
  state = {
    showUserName: true,
  };

  DashBoard = React.createRef();
  Products = React.createRef();
  Accounts = React.createRef();
  hiddenMenu = React.createRef();

  RedirectHandler = (e) => {
    if (!this.props.IsUserLoggedIn) {
      e.preventDefault();
    } else {
      this.setState({ showUserName: false });

      return true;
    }
  };

  render() {
    return (
      <div className={classes.MainTopbar}>
        <div className={classes.TopbarWrapper}>
          <NavLink to="/" className={classes.headinglink}>
            <h1 className={classes.ProductLogo}>Product Admin</h1>
          </NavLink>
          <div className={classes.RightSideMenuItems}>
            <NavLink
              to="/dashboard"
              activeClassName="is-active"
              className="Right"
              ref={this.DashBoard}
              onClick={(e) => this.RedirectHandler(e)}
            >
              <div>
                <i className={`fas fa-tachometer-alt `}></i>
                <p>Dashboard</p>
              </div>
            </NavLink>
            <NavLink
              to="/products"
              activeClassName="is-active"
              className="Right"
              ref={this.Products}
              onClick={(e) => this.RedirectHandler(e)}
            >
              <div>
                <i
                  className={`fas fa-shopping-cart ${classes.shoppingCart}`}
                ></i>
                <p>Products</p>
              </div>
            </NavLink>
            <NavLink
              to="/accounts"
              activeClassName="is-active"
              className="Right"
              ref={this.Accounts}
              onClick={(e) => this.RedirectHandler(e)}
            >
              <div>
                <i className={`far fa-user`}></i>
                <p>Accounts</p>
              </div>
            </NavLink>
            {this.props.IsUserLoggedIn ? (
              <NavLink
                onClick={this.props.UserLoggingout}
                className={classes.logout}
                to="/login"
              >
                <div>
                  {JSON.parse(localStorage.getItem("UserData")).UserName},{" "}
                  <span> Logout</span>
                </div>
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapGlobalStateToProps = (globalState) => {
  return {
    IsUserLoggedIn: globalState.IsUserLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UserLoggingout: () => {
      dispatch({ type: "USER_LOGGEDOUT" });
    },
  };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Topbar);
