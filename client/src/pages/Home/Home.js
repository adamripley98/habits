import React, { Component } from 'react';
import SideNav from '../../components/SideNav';

class Home extends Component {

  displayTest() {
    return (
      <div className="container">
        <div className="dash-card">
          helo
        </div>
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

  render() {
    return (
      <SideNav component={this.displayTest()} />
    );
  }
}
export default Home;
