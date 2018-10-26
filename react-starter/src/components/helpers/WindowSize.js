import { React } from 'utils/component';

export default class WindowSize extends React.Component {
  state = {
    width: 0,
    height: 0,
  };

  // NOTE: should throttle/debounce this and also incorporate requestAnimationFrame for performance.
  handleResize = () => {
    this.setState({
      width: Math.round(window.innerWidth),
      height: Math.round(window.innerHeight),
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { width, height } = this.state;
    return this.props.children(width, height);
  }
}
