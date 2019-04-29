const { saga } = require('./config');

let sagaString;

const listSagaString = `import { takeLatest, put } from 'redux-saga/effects';
import { Modal } from 'antd';
import * as types from './types';
import { changeData } from './action';
import { search as searchServer } from './server';

/**
 * 初始化
 * @param action
 * @returns {IterableIterator<*>}
 */
function* init(action) {
  yield put(changeData({ ready: true }));
}

/**
 * 查询
 * @param action
 * @returns {IterableIterator<*>}
 */
function* search(action) {
  try {
    const result = yield searchServer(action.param);
    if (result.code === '0') {
      yield changeData({
        list: result.info.data,
        count: result.info.meta.count,
      });
    } else {
      Modal.error({
        title: result.msg,
      });
    }
  } catch (e) {
    throw e;
  } finally {
    yield put(changeData({ dataLoading: false }));
  }
}

function* main() {
  yield takeLatest(types.init, init);
}

export default main;
`;

const pdaSagaString = `import { takeLatest, put } from 'redux-saga/effects';
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

switch (saga) {
    case 'base':
    case 'pda':
        sagaString = pdaSagaString;
    default:
        sagaString = listSagaString;
}

module.exports = {
    sagaString,
};