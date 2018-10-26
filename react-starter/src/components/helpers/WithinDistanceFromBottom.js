import { React, pt } from 'utils/component';
import Scroll from 'components/Scroll';

const WithinDistanceFromBottom = ({ distance, pages, children }) => {
  return (
    <Scroll>
      {(x, y, maxX, maxY, windowWidth, windowHeight) => {
        const offset = pages ? windowHeight * pages : distance;
        const isWithinDistance = y >= maxY - offset;
        return children(y, isWithinDistance);
      }}
    </Scroll>
  );
};

WithinDistanceFromBottom.propTypes = {
  // Distance in pixels
  distance: pt.number,
  // Distance based on window height
  pages: pt.number,
};

WithinDistanceFromBottom.defaultProps = {
  distance: 0,
  pages: 0,
};

export default WithinDistanceFromBottom;
