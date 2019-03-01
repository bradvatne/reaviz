import React from 'react';
import { storiesOf } from '@storybook/react';
import { ScatterPlot } from './ScatterPlot';
import {
  signalChartData,
  largeSignalChartData,
  medSignalChartData,
  signalStageData,
  signalStages
} from '../common/demo/signals';
import { randomNumber } from '../common/demo';
import { range } from 'd3-array';
import { GridlineSeries, Gridline, GridStripe } from '../common/Gridline';
import { ScatterSeries, ScatterPoint } from './ScatterSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxis,
  LinearXAxisTickSeries
} from '../common/Axis/LinearAxis';

storiesOf('Charts/Scatter Plot', module)
  .add('Simple', () => (
    <ScatterPlot height={400} width={750} data={medSignalChartData} />
  ))
  .add('Categorical Axis', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={signalStageData}
      yAxis={
        <LinearYAxis
          type="category"
          domain={signalStages as any}
          tickSeries={
            <LinearYAxisTickSeries
              label={<LinearYAxisTickLabel rotation={false} />}
            />
          }
        />
      }
      gridlines={
        <GridlineSeries
          line={<Gridline direction="y" />}
          stripe={<GridStripe direction="y" />}
        />
      }
    />
  ))
  .add('No Animation', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={medSignalChartData}
      series={<ScatterSeries animated={false} />}
    />
  ))
  .add('Performance', () =>
    range(15).map(i => (
      <div
        key={i}
        style={{
          width: '250px',
          height: '250px',
          border: 'solid 1px green',
          margin: '25px',
          display: 'inline-block'
        }}
      >
        <ScatterPlot data={medSignalChartData} />
      </div>
    ))
  )
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <ScatterPlot data={medSignalChartData} />
    </div>
  ))
  .add('Symbols', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={signalChartData}
      series={
        <ScatterSeries
          point={
            <ScatterPoint
              symbol={() => (
                <g transform="translate(-10, -10)">
                  <polygon
                    transform="scale(0.1)"
                    points="100,10 40,198 190,78 10,78 160,198"
                    style={{
                      fill: 'lime',
                      stroke: 'purple',
                      strokeWidth: 5,
                      fillRule: 'nonzero'
                    }}
                  />
                </g>
              )}
            />
          }
        />
      }
    />
  ))
  .add('Bubble', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={largeSignalChartData}
      margins={20}
      series={
        <ScatterSeries
          point={
            <ScatterPoint
              fill="rgba(174, 52, 255, .5)"
              size={v => {
                return v.meta.severity + 5;
              }}
            />
          }
        />
      }
    />
  ))
  .add('Live Update', () => <BubbleChartLiveUpdate />);

class BubbleChartLiveUpdate extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: largeSignalChartData.map(d => ({ ...d }))
    };
  }

  updateData = () => {
    const data = this.state.data.map(item => {
      item.data = randomNumber(1, 100);
      return { ...item };
    });

    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <ScatterPlot
          height={400}
          width={750}
          data={this.state.data}
          margins={20}
          series={
            <ScatterSeries
              point={
                <ScatterPoint
                  fill="rgba(174, 52, 255, .5)"
                  size={v => {
                    return v.meta.severity + 5;
                  }}
                />
              }
            />
          }
        />
        <br />
        <button onClick={this.updateData}>Update</button>
      </React.Fragment>
    );
  }
}
