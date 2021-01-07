import React from 'react';
import {Svg, Rect, G, Polygon} from 'react-native-svg';

const BackIcon = props => (
  <Svg width="6" height="15" viewBox="0 0 6 15">
    <G id="filename">
      <G id="_006" data-name="006">
        <Rect fill="none" width="6" height="15" />
      </G>
    </G>
    <G id="icon">
      <Polygon
        fill={props.fill}
        points="5.18 15 0 7.5 5.18 0 6 0.57 1.22 7.5 6 14.43 5.18 15"
      />
    </G>
  </Svg>
);

export default BackIcon;
