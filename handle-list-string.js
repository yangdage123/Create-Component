const listString = `import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { Pagination, Table } from 'antd';
import styles from '../../../../style.css';
import { getSize } from '../../../../../middlewares/pagesize';
import { changeLimit, search } from '../action';
import { getSize, changeSize } from '../../../../middlewares/pagesize';

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
    headerHeight,
  } = props;
  const columns = [];
  const handlePaginationChange = (page, size) => {
    dispatch(changeLimit({
      pageNum: page,
      pageSize: size,
    }));
    dispatch(changeSize(size));
    dispatch(search(assign({}, limit, {
      pageNum: page,
      pageSize: size,
    })));
  };
  let oheight = headerHeight + 200;
  const x = columns.reduce((pre, cur) => pre + +cur.width, 0);
  // 表格的高度,要进行不小于50px的判断
  const y = window.innerHeight - oHeight;
  return (
    <div className={styles.listBox}>
      <Table
        bordered
        loading={dataLoading}
        dataSource={list}
        columns={columns}
        pagination={false}
        scroll={{ x, y: y > 50 ? y : 50 }}
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
  headerHeight: PropTypes.number.isRequired,
};

export default List;
`;

module.exports = {
  listString,
};
