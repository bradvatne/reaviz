import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { largeDateData, largeSignalChartData } from '../demo';
import { LineChart, LineSeries } from '../../LineChart';
import { ChartZoomPan } from '../ZoomPan';
import { ScatterPlot, ScatterSeries, ScatterPoint } from '../../ScatterPlot';
import { AreaChart, AreaSeries } from '../../AreaChart';
import { TooltipArea } from '../TooltipArea';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel
} from '../Axis';

storiesOf('Charts/Zoom Pan', module)
  .add('Line', () => (
    <LineChart
      width={450}
      height={300}
      data={largeDateData}
      zoomPan={<ChartZoomPan disabled={false} />}
      series={
        <LineSeries tooltip={<TooltipArea disabled={true} />} markLine={null} />
      }
      xAxis={
        <LinearXAxis
          type="time"
          tickSeries={
            <LinearXAxisTickSeries
              label={<LinearXAxisTickLabel rotation={false} />}
            />
          }
        />
      }
    />
  ))
  .add('Area', () => (
    <AreaChart
      width={350}
      height={250}
      data={largeDateData}
      zoomPan={<ChartZoomPan disabled={false} />}
      series={
        <AreaSeries tooltip={<TooltipArea disabled={true} />} markLine={null} />
      }
      xAxis={
        <LinearXAxis
          type="time"
          tickSeries={
            <LinearXAxisTickSeries
              label={<LinearXAxisTickLabel rotation={false} />}
            />
          }
        />
      }
    />
  ))
  .add('Scatter', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={largeSignalChartData}
      margins={20}
      zoomPan={<ChartZoomPan disabled={false} />}
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
  .add('Default Zoom', () => <DefaultZoomStory />);

class DefaultZoomStory extends Component<{}, { domain: [any, any] }> {
  state: { domain: [any, any] } = {
    domain: [largeDateData[5].key, largeDateData[25].key]
  };

  onZoomPan = ({ domain }) => {
    this.setState({
      domain
    });
  };

  render() {
    const zoomDomain = this.state.domain;

    return (
      <LineChart
        width={450}
        height={300}
        data={largeDateData}
        zoomPan={
          <ChartZoomPan
            disabled={false}
            domain={zoomDomain}
            onZoomPan={this.onZoomPan}
          />
        }
        series={
          <LineSeries
            tooltip={<TooltipArea disabled={true} />}
            markLine={null}
          />
        }
        xAxis={
          <LinearXAxis
            domain={zoomDomain}
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={<LinearXAxisTickLabel rotation={false} />}
              />
            }
          />
        }
      />
    );
  }
}
