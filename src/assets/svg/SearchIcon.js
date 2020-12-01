import React from 'react';
import {Svg, Path, Rect, G, ClipPath, Defs} from 'react-native-svg';

const SearchIcon = props => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Defs>
      <ClipPath id="a">
        <Rect
          fill={props.fill}
          width="24"
          height="24"
          transform="translate(101 620)"
        />
      </ClipPath>
    </Defs>
    <G class="b" transform="translate(-101 -620)">
      <G transform="translate(101 620)">
        <Rect fill="none" width="24" height="24" />
        <Path
          fill={props.fill}
          d="M20.3,18.2l-3.9-3.9-.1-.1a7.411,7.411,0,0,0-.9-9.1,7.243,7.243,0,0,0-10.2,0h0a7.243,7.243,0,0,0,0,10.2,7.149,7.149,0,0,0,9.1.9l.1.1,3.9,3.9h0a.967.967,0,0,0,1.4,0l.7-.7h0A.946.946,0,0,0,20.3,18.2Zm-7.1-5a4.35,4.35,0,0,1-6,0,4.35,4.35,0,0,1,0-6,4.243,4.243,0,0,1,6,6Z"
        />
      </G>
    </G>
  </Svg>
);

export default SearchIcon;
