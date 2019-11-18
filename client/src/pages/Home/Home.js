import React, { Component } from 'react';
import SideNav from '../../components/SideNav';

class Home extends Component {
  constructor(props) {
    super(props);
    this.displayTest = this.displayTest.bind(this);
  }

  displayTest() {
    return (
      <div className="container">
        hello world
        <input type="button" name="" value="Enter Today's Habits" />
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
