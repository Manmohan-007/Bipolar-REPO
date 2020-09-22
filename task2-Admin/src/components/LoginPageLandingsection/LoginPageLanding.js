import React, { Component } from "react";
import classes from "./LoginPage.module.css";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
class LoginPageLanding extends Component {
  state = {
    UserName: "",
    Password: "",
    isUserLoggedInValid: false,
    isPasswordValid: false,
  };

  checker = (response) => {
    let arr = [];
    response.map((item) => {
      if (
        item.username == this.state.UserName &&
        item.password == this.state.Password
      ) {
        arr.push(item);
      }
    });
    if (arr.length !== 0) {
      return true;
    }
  };
  handleLocalStorage = () => {
    let obj = {
      UserName: this.state.UserName,
      Password: this.state.Password,
    };

    localStorage.setItem("UserData", JSON.stringify(obj));
  };

  handleLogin = () => {
    axios
      .get("https://5ee90a15ca595700160298cc.mockapi.io/BackEnd")
      .then((response) => {
        this.checker(response.data);
        if (this.checker(response.data)) {
          this.props.UserLoggedIn();
          this.handleBackEndData();
          this.handleLocalStorage();
          this.props.history.push("/dashboard");

          alert("Login Successful");
        } else {
          alert("Invalid Credentials");
        }
      });
  };

  handleBackEndData = () => {
    return axios
      .get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
      .then((response) => {
        localStorage.setItem("ApiDataBase", JSON.stringify(response.data));
      });
  };
  handleUserName = (e) => {
    this.setState({
      UserName: e.target.value,
    });
  };
  handlePassWord = (e) => {
    this.setState({
      Password: e.target.value,
    });
  };

  render() {
    return (
      <div className={classes.main}>
        <form
          className={classes.LoginForm}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>Welcome to Dashboard, Login</h2>
          <div>
            <span>Username</span>
            <input
              type="text"
              name="username"
              className={classes.username}
              onChange={this.handleUserName}
              required
            />
            <ul className={`${classes.loginVal}  fall `}>
              <li>Starts with not less than 3 characters</li>
              <li className={classes.ConditionLi1}>
                Numeric Characters are optional
              </li>
            </ul>
          </div>
          <div>
            <span>Password</span>
            <input
              type="password"
              name="pass"
              onChange={this.handlePassWord}
              required
            />
            <ul className={`${classes.passVal} passClass`}>
              <li>Not less than 8 characters</li>
              <li>Contains a digit</li>
              <li>Contains an uppercase letter</li>
              <li>Contains a lowercase letter</li>
              <li>A character not being alphanumeric</li>
            </ul>
          </div>
          <div>
            <button onClick={this.handleLogin}>Login</button>
          </div>
          <Link to="/registration">
            <button>Register</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (Dispatch) => {
  return {
    UserLoggedIn: () => {
      Dispatch({ type: "USER_LOGGEDIN" });
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPageLanding);
