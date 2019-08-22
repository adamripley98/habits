import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-lg-4 dash-card">
            Weekly sales
          </div>
          <div className="col-lg-4 dash-card">
            Weekly orders
          </div>
          <div className="col-lg-4 dash-card">
            Visitors online
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
