import React from 'react';
import { storiesOf } from '@storybook/react';
import chroma from 'chroma-js';

import { PieChart } from './PieChart';
import { categoryData, randomNumber } from '../common/demo';
import { PieArcSeries, PieArcLabel } from './PieArcSeries';

storiesOf('Charts/Pie', module)
  .add('Simple', () => (
    <PieChart
      width={350}
      height={250}
      data={categoryData}
      series={
        <PieArcSeries
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(categoryData.length)}
        />
      }
    />
  ))
  .add('Live Updating', () => <LiveUpdatingStory />)
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <PieChart data={categoryData} />
    </div>
  ))
  .add('Donut', () => (
    <PieChart
      width={350}
      height={250}
      data={categoryData}
      series={
        <PieArcSeries
          doughnut={true}
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(categoryData.length)}
        />
      }
    />
  ))
  .add('Labels', () => (
    <PieChart
      width={350}
      height={250}
      data={categoryData}
      series={
        <PieArcSeries
          doughnut={true}
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(categoryData.length)}
          label={<PieArcLabel show={true} />}
        />
      }
    />
  ))
  .add('Inner Label', () => (
    <div
      style={{
        position: 'relative',
        height: '250px',
        width: '350px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <PieChart
          width={350}
          height={250}
          data={categoryData}
          series={
            <PieArcSeries
              doughnut={true}
              colorScheme={chroma
                .scale(['ACB7C9', '418AD7'])
                .colors(categoryData.length)}
            />
          }
        />
      </div>
      <h1 style={{ margin: '0 5px', padding: 0 }}>
        {categoryData.length} Attacks
      </h1>
    </div>
  ));

class LiveUpdatingStory extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: [...categoryData]
    };
  }

  updateData = () => {
    const data = this.state.data;
    const updateCount = randomNumber(1, 4);
    const newData = [...data];

    let idx = 0;
    while (idx <= updateCount) {
      const updateIndex = randomNumber(0, data.length - 1);
      newData[updateIndex] = {
        ...newData[updateIndex],
        data: randomNumber(10, 100)
      };

      idx++;
    }

    this.setState({ data: newData });
  };

  render() {
    const data = this.state.data;
    return (
      <React.Fragment>
        <PieChart
          width={350}
          height={250}
          data={data}
          series={
            <PieArcSeries
              colorScheme={chroma
                .scale(['ACB7C9', '418AD7'])
                .colors(data.length)}
            />
          }
        />
        <br />
        <button onClick={this.updateData}>Update</button>
      </React.Fragment>
    );
  }
}
