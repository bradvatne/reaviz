import React from 'react';

interface GradientProps {
  id?: string;
  color?: string;
  offsets: Array<{
    offset: number | string;
    stopOpacity: number;
    color?: string;
  }>;
}

export class Gradient extends React.Component<GradientProps, {}> {
  static defaultProps: GradientProps = {
    offsets: [
      { offset: '0%', stopOpacity: 0.3 },
      { offset: '80%', stopOpacity: 1 }
    ]
  };

  render() {
    const { id, color, offsets } = this.props;
    return (
      <linearGradient
        spreadMethod="pad"
        id={id}
        x1="10%"
        x2="10%"
        y1="100%"
        y2="0%"
      >
        {offsets.map((offset, index) => (
          <stop
            key={`gradient-${index}`}
            offset={offset.offset}
            stopColor={offset.color || color}
            stopOpacity={offset.stopOpacity}
          />
        ))}
      </linearGradient>
    );
  }
}
