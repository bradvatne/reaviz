import { storiesOf } from '@storybook/react';
import chroma from 'chroma-js';
import { timeDay } from 'd3-time';
import React from 'react';
import moment from 'moment';
import { withKnobs, select } from '@storybook/addon-knobs';

import {
  multiDateData,
  singleDateData,
  largeDateData,
  randomNumber,
  medDateData
} from '../common/demo';
import { LineChart, LineSeries } from './LineChart';
import {
  StackedAreaChart,
  StackedNormalizedAreaChart,
  StackedAreaSeries,
  Line,
  StackedNormalizedAreaSeries
} from '../AreaChart';
import { GridlineSeries, Gridline } from '../common/Gridline';
import { CircleSeries } from '../common/CircleSeries';
import { LinearXAxisTickSeries, LinearXAxis } from '../common/Axis/LinearAxis';

storiesOf('Charts/Line/Single Series', module)
  .addDecorator(withKnobs)
  .add('Simple', () => (
    <LineChart width={350} height={250} data={singleDateData} />
  ))
  .add('No Animation', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries animated={false} />}
    />
  ))
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <LineChart data={singleDateData} xAxis={<LinearXAxis type="time" />} />
    </div>
  ))
  .add('Interval', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      xAxis={
        <LinearXAxis
          type="time"
          tickSeries={<LinearXAxisTickSeries interval={timeDay} />}
        />
      }
    />
  ))
  .add(
    'Interpolation',
    () => {
      const options = {
        linear: 'linear',
        step: 'step',
        smooth: 'smooth'
      };

      const value = select('Type', options, 'linear');

      return (
        <LineChart
          width={350}
          height={250}
          data={medDateData}
          series={<LineSeries interpolation={value} />}
          xAxis={<LinearXAxis type="time" />}
        />
      );
    },
    { options: { showAddonPanel: true } }
  )
  .add('Large Dataset', () => (
    <LineChart
      width={350}
      height={250}
      data={largeDateData}
      xAxis={<LinearXAxis type="time" />}
    />
  ))
  .add('Dynamic Colors', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={
        <LineSeries
          colorScheme={(_data, _index, active) => (active ? 'blue' : 'green')}
        />
      }
    />
  ))
  .add('Live Updating', () => <LiveUpdatingStory />);

storiesOf('Charts/Line/Multi Series', module)
  .add('Simple', () => (
    <LineChart
      width={550}
      height={350}
      series={
        <LineSeries
          colorScheme={chroma
            .scale(['27efb5', '00bfff'])
            .colors(multiDateData.length)}
        />
      }
      data={multiDateData}
    />
  ))
  .add('Stacked', () => (
    <StackedAreaChart
      width={550}
      height={350}
      series={
        <StackedAreaSeries
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(multiDateData.length)}
          area={null}
          line={<Line strokeWidth={3} />}
        />
      }
      data={multiDateData}
    />
  ))
  .add('Stacked Normalized', () => (
    <StackedNormalizedAreaChart
      width={550}
      height={350}
      data={multiDateData}
      series={
        <StackedNormalizedAreaSeries
          colorScheme={chroma
            .scale(['27efb5', '00bfff'])
            .colors(multiDateData.length)}
          area={null}
          line={<Line strokeWidth={3} />}
        />
      }
    />
  ));

storiesOf('Charts/Line/Gridlines', module)
  .add('All Axes', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  ))
  .add('X-Axis', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    />
  ))
  .add('Y-Axis', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    />
  ));

storiesOf('Charts/Line/Circle Series', module)
  .add('On', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<CircleSeries show={true} />} />}
    />
  ))
  .add('Off', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={null} />}
    />
  ))
  .add('On Hover', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<CircleSeries show="hover" />} />}
    />
  ))
  .add('Only First', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<CircleSeries show="first" />} />}
    />
  ))
  .add('Only Last', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<CircleSeries show="last" />} />}
    />
  ));

class LiveUpdatingStory extends React.Component<any, any> {
  int: any;
  offset = 0;

  constructor(props) {
    super(props);
    this.state = {
      data: [...singleDateData]
    };
  }

  startData = () => {
    this.int = setInterval(() => {
      const data = [
        ...this.state.data,
        {
          key: moment()
            .add(++this.offset, 'day')
            .toDate(),
          data: randomNumber(1, 20)
        }
      ];

      this.setState({ data });
    }, 500);
  };

  stopData = () => {
    clearInterval(this.int);
  };

  render() {
    return (
      <React.Fragment>
        <LineChart width={550} height={350} data={this.state.data} />
        <br />
        <button onClick={this.startData}>Start</button>
        <button onClick={this.stopData}>Stop</button>
      </React.Fragment>
    );
  }
}
