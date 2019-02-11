const config = require('./config');
const { fileUrl } = config

const viewString = `import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Container extends Component {
  render() {
    const {
      ready,
    } = this.props;
    return (
      <div>
        <Header {...this.props} />
      </div>
    );
  }
}

Container.propTypes = {
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
