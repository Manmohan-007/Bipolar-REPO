import React, { Component } from "react";
import classes from "./order.module.css";
import "./order.css";
import Axios from "axios";
import { Link } from "react-router-dom";
class order extends Component {
  state = {
    UserName: "",
    UserData: [],
  };

  componentDidMount = () => {
    Axios.get("https://5ee90a15ca595700160298cc.mockapi.io/playlist1").then(
      (response) => {
        this.setState({
          UserData: [...response.data],
        });
      }
    );
    const user = JSON.parse(localStorage.getItem(["UserData"])).UserName;
    this.setState({
      UserName: user,
    });
  };

  dltUser = (e, pos) => {
    const arr = this.state.UserData;

    const id2 = pos + 1;
    Axios.delete(`https://5ee90a15ca595700160298cc.mockapi.io/playlist1/${id2}`)
      .then(response => {
        console.log(response)
        if (response.status == 200) {

          arr.splice(pos, 1);
          this.setState({

            UserData: arr



          })
          alert("Data deleted Successfully");

        }

      })
      .catch(err => {
        console.log(err)
      })




  }

  handleAddClick = () => {
    this.props.props.history.push("/products/add");


  }





  render() {
    const Api = this.state.UserData;

    const renderedTable = Api.map((item, pos) => {
      return (
        <tr key={pos + 1}>
          <th>
            <b>{item.username}</b>
          </th>
          <td>
            <b>{item.email}</b>
          </td>
          <td>
            <b>{item.firstname}</b>
          </td>
          <td>{item.lastname}</td>

          <div
            className={`${this.state.UserName == "Manmohan" ? null : `${classes.hidden}`
              } ${classes.special} `}
          >
            <td>
              <Link to="products/add">
                <span onClick={(e) => this.props.position(pos)}>
                  <i abc={pos} className={`fas fa-pen`}></i>
                </span>{" "}
              </Link>
              <span onClick={(e) => { this.dltUser(e, pos) }}>
                <i className={`fas fa-trash`}></i>
              </span>
            </td>
          </div>
        </tr>
      );
    });

    return (
      <div className={classes.MainWrapper}>
        <div>
          <h2>UserData</h2>
          <div className={classes.TableWrapper}>
            <table className={classes.TableContainer}>
              <thead className={classes.thead}>
                <tr>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th
                    className={`${this.state.UserName == "Manmohan"
                      ? `${classes.hidden}`
                      : null
                      } `}
                  ></th>
                </tr>
              </thead>
              <tbody>{renderedTable}</tbody>
            </table>
          </div>
          <button onClick={this.handleAddClick} className={`${this.state.UserName == "Manmohan" ? null : `${classes.hidden}`} ${classes.AddUserBtn}`}>Add User</button>
        </div>
      </div>
    );
  }
}

export default order;
