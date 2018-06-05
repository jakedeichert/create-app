import { React, pt, connect, styled } from 'utils/component';
import {
  actions as counterActions,
  selectors as counterSelectors,
} from 'store/counter';
import { selectors as dataSelectors } from 'store/data';
import * as keyboard from 'utils/keyboard';

const Wrapper = styled.div`
  color: black;
`;

const ClickCount = styled.p`
  font-family: Monaco, monospace;
  font-size: 13px;
  padding: 0 0 10px;
  text-align: center;
`;

const ListItem = styled.li`
  background: #0fdfff;
  color: white;
  cursor: pointer;
  list-style: none;
  margin: 0 auto 20px;
  padding: 20px;
  max-width: 300px;
`;

export class ButtonList extends React.Component {
  static propTypes = {
    data: pt.array.isRequired,
    counter: pt.number.isRequired,
    incrementCounter: pt.func,
  };

  render() {
    const { counter } = this.props;
    return (
      <Wrapper>
        {this.renderList()}
        <ClickCount>Click Count: {counter}</ClickCount>
      </Wrapper>
    );
  }

  renderList() {
    const { data } = this.props;
    return (
      <ul>
        {data.map(v => (
          <ListItem
            key={v.id}
            role="button"
            tabIndex={0}
            onClick={this.handleClick}
            onKeyUp={keyboard.onFocusKeyUp(this.handleClick)}>
            {v.value}
          </ListItem>
        ))}
      </ul>
    );
  }

  handleClick = () => {
    this.props.incrementCounter();
  };
}

export default connect(
  state => ({
    data: dataSelectors.getAllValues(state),
    counter: counterSelectors.get(state),
  }),
  dispatch => ({
    incrementCounter: () => dispatch(counterActions.incrementCounter()),
  })
)(ButtonList);
