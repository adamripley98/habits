import React, { Component } from 'react';
import {
  XYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries,
} from 'react-vis';
import SideNav from '../../components/SideNav';
import data from '../../dummydata/fitness.json';

class Home extends Component {

  constructor(props) {
    super(props);
    this.displayTest = this.displayTest.bind(this);
    this.displayGraph = this.displayGraph.bind(this);
  }

  displayGraph() {
    const chartWidth = 600;
    const chartHeight = 100;
    const chartDomain = [0, chartHeight];
    return (
      <XYPlot
        xType="ordinal"
        width={chartWidth}
        height={chartHeight}
        yDomain={chartDomain}
        className="chart"
      >
        <XAxis />
        <VerticalBarSeries
          data={data}
          color="#F7BE16"
        />
        <LabelSeries
          data={data.map((obj) => {
            return { ...obj, label: obj.y.toString() };
          })}
          labelAnchorX="middle"
          labelAnchorY="text-after-edge"
        />
      </XYPlot>
    );
  }

  displayTest() {
    return (
      <div className="container">
        {this.displayGraph()}
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
