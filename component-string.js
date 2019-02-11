const { fileUrl } = require('./config');

const viewString = `import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';

class Container extends Component {
   
  componentDidMount() {
    this.props.dispatch(init(this.props));
  }

  render() {
    const {
      ready,
    } = this.props;
    if (ready) {
      return (
        <div>
          <Header {...this.props} />
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}

Container.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};
const stateToProps = state => state['${fileUrl}'];
export default connect(stateToProps)(Container);
`;

const sagaString = `import { takeLatest, put } from 'redux-saga/effects';
import * as types from './types';

function* main() {

}

export default main;
`;

const typesString = `export let init;
export let changeData;
`;

const actionString = `import { makeActionCreator } from '../../../../lib/deal-func';
import * as types from './types';

export const init = makeActionCreator(types.init);

export const changeData = makeActionCreator(types.changeData, 'data');
`;

const reducersString = `import assign from 'object-assign';
import * as types from './types';

export const defaultState = {
  ready: false,
  limit: {

  },
};

const reducer = (state = defaultState, action) => {
  switch (action.types) {
    case types.init:
      return assign({}, state, defaultState);
    case types.changeData:
      return assign({}, state, action.data);
    default:
      return state;
  }
};

export default reducer;
`;

const meString = `{
  "description": "",
  "crumb": []
}
`;

module.exports = {
  viewString,
  sagaString,
  typesString,
  actionString,
  reducersString,
  meString,
};
