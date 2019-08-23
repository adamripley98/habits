import React, { Component } from 'react';
import SideNav from '../components/SideNav';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <SideNav />
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-lg-6 dash-card">
            Total optimization
            <div className="circle">
              76
            </div>
          </div>
          <div className="col-lg-5 dash-card">
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
