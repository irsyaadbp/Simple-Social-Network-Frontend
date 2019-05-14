import React, { Component } from "react";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false
    };
  }
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.signIn(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else{
          //authentication
          //redirect
      }
        
    });
  };

  signIn = user => {
    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  signInForm = (email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {this.signInForm(email, password)}
      </div>
    );
  }
}

export default SignIn;
