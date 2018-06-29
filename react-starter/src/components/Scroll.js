import { React } from 'utils/component';
import WindowSize from 'components/WindowSize';

export default class Scroll extends React.Component {
  state = {
    x: 0,
    y: 0,
  };

  handleScroll = () => {
    this.setState({
      x: Math.round(window.scrollX),
      y: Math.round(window.scrollY),
    });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // Must call once since page could be reloaded and scrolled already
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { x, y } = this.state;
    return (
      <WindowSize>
        {(width, height) => {
          const maxX = document.body.scrollWidth - width;
          const maxY = document.body.scrollHeight - height;
          return this.props.children(x, y, maxX, maxY, width, height);
        }}
      </WindowSize>
    );
  }
}
