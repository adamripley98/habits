import React, { Component } from 'react';
import SideNav from '../../components/SideNav';

class Habits extends Component {

  displayTest() {
    return (
      <div className="container">
        <h1>Habits</h1>
        <h3>Fitness</h3>
        <p>Lift 3x per week</p>
        <p>Lift 3x per week</p>

        <h5>Sleep</h5>
        <h5>Diet</h5>
        <h5>Sleep</h5>
        <h5>Fitness</h5>
        <h5>Sleep</h5>
        <table>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>Lift 5x per week</td>
          </tr>
          <tr>
            <td>Do cardio 3x per week</td>
          </tr>
          <tr>
            <td>Do abs 3x per weeks</td>
          </tr>
        </table>
      </div>
    );
  }

  render() {
    return (
      <SideNav component={this.displayTest()} />
    );
  }
}
export default Habits;
