import { React, pt } from 'utils/component';

// Only useful if one of its parents can rerender due to a DOM related state update.
// Example: if the parent listens to the state of current items rendered to the DOM,
// then this component may be useful.
export default class ElementSize extends React.Component {
  static propTypes = {
    // Only DOM elements are allowed. If no element is specified, then the document body is used.
    element: pt.object,
  };

  static defaultProps = {
    element: null,
  };

  state = {
    width: 0,
    height: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const nextState = {};
    const el = this.getElement();

    if (prevState.width !== el.clientWidth) {
      nextState.width = el.clientWidth;
    }

    if (prevState.height !== el.clientHeight) {
      nextState.height = el.clientHeight;
    }

    if (Object.keys(nextState).length) this.setState(nextState);
  }

  getElement() {
    this.props.element || document.body;
  }

  render() {
    const { height } = this.state;
    const hasChanged = height !== this.getElement().clientHeight;
    return this.props.children(height, hasChanged);
  }
}
