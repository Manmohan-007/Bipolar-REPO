import React, { Component } from "react";
import RegistrationComp from "../../components/RegistrationPageComp/RegistrationComp";

class Registration extends Component {
  render() {
    return (
      <div>
        <RegistrationComp props={this.props} />
      </div>
    );
  }
}

export default Registration;
