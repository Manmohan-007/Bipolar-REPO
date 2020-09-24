import React, { Component } from "react";
import classes from "./add.module.css";
import axios from "axios";
class addProductPage extends Component {
  state = {
    UserName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    propy: this.props.propy,
  };

  UserName = React.createRef();
  Email = React.createRef();
  FirstName = React.createRef();
  LastName = React.createRef();

  ChangeHandler = () => {
    this.setState({
      UserName: this.UserName.current.value,
      FirstName: this.FirstName.current.value,
      LastName: this.LastName.current.value,
      Email: this.Email.current.value,
    });
  };

  addUser = () => {
    let ValidValue = false;
    const UserObj = {
      username: this.state.UserName,
      email: this.state.Email,
      firstname: this.state.FirstName,
      lastname: this.state.LastName,
    };
    for (let i in UserObj) {
      if (UserObj[i] !== "" && UserObj[i] !== null && UserObj[i] !== undefined && UserObj[i] !== 0) {


        ValidValue = true;
      }

      else {
        ValidValue = false;
        break;
      }


    }
    if (!ValidValue) {
      alert("Enter the Valid Value")
    }
    else {

      axios.post(
        "https://5ee90a15ca595700160298cc.mockapi.io/playlist1",
        UserObj
      )
        .then(response => {
          if (response.status == 201) {
            alert("Data added Successfully")
            this.props.history.push("/dashboard")
          }
        })

    }



  };

  EditApi = () => {
    let ValidValue = false;
    const UserObj = {
      username: this.state.UserName,
      email: this.state.Email,
      firstname: this.state.FirstName,
      lastname: this.state.LastName,
    };

    const id1 = this.state.propy + 1;
    for (let i in UserObj) {
      if (UserObj[i] !== "" && UserObj[i] !== null && UserObj[i] !== undefined && UserObj[i] !== 0) {
        ValidValue = true;
      }

      else {
        ValidValue = false;
        break;
      }


    }
    if (!ValidValue) {
      alert("Enter the Valid Value")
    }
    else {
      axios
        .put(
          `https://5ee90a15ca595700160298cc.mockapi.io/playlist1/${id1}`,
          UserObj
        )
      this.props.history.push("/dashboard")




    }
  };

  render() {
    console.log(this.state.propy, 123);
    return (
      <div>
        <div className={classes.MainDivWrapper}>
          <h2 className={classes.PageTitle}></h2>
          <div className={classes.PageData}>
            <form className={classes.formData}>
              <div className={classes.FormFields}>
                <label>User Name</label>
                <input
                  ref={this.UserName}
                  onChange={this.ChangeHandler}
                  type="text"
                  name="name"
                  className={classes.FormInp}
                  required
                />
              </div>

              <div className={classes.Stocks}>
                <div className={classes.StockDate}>
                  <label>Email</label>
                  <input
                    ref={this.Email}
                    onChange={this.ChangeHandler}
                    name="ExpireDate"
                    type="email"
                    className={classes.expireDateInp} required
                  ></input>
                </div>
                <div className={classes.StocksAvail}>
                  <label>First name</label>
                  <input
                    ref={this.FirstName}
                    onChange={this.ChangeHandler}
                    name="stock"
                    type="text"
                    className={classes.StocksAvailData}
                    required
                  />
                </div>
                <div className={classes.LastName}>
                  <label>Last Name</label>
                  <input
                    ref={this.LastName}
                    onChange={this.ChangeHandler}
                    name="sold"
                    type="text"
                    className={classes.soldData}
                    required
                  />
                </div>
              </div>
            </form>
            <button onClick={this.EditApi} className={classes.submitBtn}>
              Update User
            </button>
            <button className={classes.AddUserBtn} onClick={this.addUser}>Add User </button>
          </div>
        </div>
      </div>
    );
  }
}

export default addProductPage;
