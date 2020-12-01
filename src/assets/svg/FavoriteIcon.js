import React from 'react';
import {Svg, Path, Rect, G, ClipPath, Defs} from 'react-native-svg';

const FavoriteIcon = ({isLiked}) => {
  const fill = isLiked == true ? 'red' : '#E6E6E6';
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="a">
          <Rect
            fill={fill}
            width="24"
            height="24"
            transform="translate(176 620)"
          />
        </ClipPath>
      </Defs>
      <G class="b" transform="translate(-176 -620)">
        <G transform="translate(176 620)">
          <Rect fill="none" width="24" height="24" />
          <Path
            fill={fill}
            d="M13.3,20.29,12,21.5l-1.31-1.22C6.06,16,3,13.1,3,9.6A5,5,0,0,1,8,4.5a5.5,5.5,0,0,1,4,2.09A5.5,5.5,0,0,1,16.05,4.5,5,5,0,0,1,21,9.6C21,13.1,17.94,16,13.3,20.29Z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default FavoriteIcon;
