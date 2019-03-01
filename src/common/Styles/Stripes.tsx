import React from 'react';

interface StripesProps {
  id?: string;
  fill?: string;
}

export class Stripes extends React.Component<StripesProps, {}> {
  render() {
    const { id, fill } = this.props;
    return (
      <pattern
        id={id}
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect className="area-stripe" width="1" height="4" fill={fill} />
      </pattern>
    );
  }
}
