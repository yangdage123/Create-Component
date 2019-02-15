const { fileUrl, headerClass } = require('./config');

const viewString = `import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import $ from 'jquery';
import { init } from './action';
import styles from '../../../style.css';
import Header from './jsx/header';

class Container extends Component {
  componentDidMount() {
    this.props.dispatch(init(this.props));
    this.onresize = () => requestAnimationFrame(() => this.forceUpdate());
    window.addEventListener('resize', this.onresize);
  }

  componentDidUpdate() {
    this.updateHeaderHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onresize);
  }

  updateHeaderHeight() {
    const h = $(${'`.${'}${headerClass}${'}`'}).innerHeight;
    if (h && h !== this.headerHeight) {
      this.headerHeight = h;
      this.forceUpdate();
    }
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
import { changeData } from './action';

function* init(action) {
  yield put(changeData({ ready: true }));
}

function* main() {
  yield takeLatest(types.init, init);
}

export default main;
`;

const typesString = `export let init;
export let changeData;
`;

const actionString = `import { makeActionCreator } from '../../../../lib/deal-func';
import * as types from './types';

export const init = makeActionCreator(types.init, 'props');

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
  switch (action.type) {
    case types.init:
      return assign({}, state, defaultState, {
        ready: false,
      });
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

const { headerString } = require('./handle-header-string');

const listString = `import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Table } from 'antd';
import styles from '../../../../style.css';
import { getSize } from '../../../../../middlewares/pagesize';
import { changeLimit } from '../action';

const List = (props) => {
  const {
    dispatch,
    dataLoading,
    list,
    limit: {
      pageNum,
    },
    pageSizeOptions,
    count,
  } = props;
  const columns = [];
  const handlePaginationChange = (page, size) => {
    dispatch(changeLimit({
      pageNum: page,
      pageSize: size,
    }));
  };

  return (
    <div className={styles.listBox}>
      <Table
        bordered
        loading={dataLoading}
        dataSource={list}
        columns={columns}
        pagination={false}
      />
      <Pagination
        className={styles.rightDown}
        showQuickJumper
        showSizeChanger
        current={pageNum}
        pageSizeOptions={pageSizeOptions}
        pageSize={parseInt(getSize(), 10)}
        total={count}
        showTotal={v => ${'`共${v}条`'}}
        onChange={handlePaginationChange}
        onShowSizeChange={handlePaginationChange}
      />
    </div>
  );
};

List.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
  limit: PropTypes.shape.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  count: PropTypes.number.isRequired,
};

export default List;
`;


module.exports = {
  viewString,
  sagaString,
  typesString,
  actionString,
  reducersString,
  meString,
  headerString,
  listString,
};
