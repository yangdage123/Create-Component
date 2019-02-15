const { headers } = require('./config');

const types = Array.from(new Set(headers.map(v => v.type)));


let headerString = '';

// 依赖的导入
let importStr = `import React from 'react';
import PropTypes from 'prop-types';`;
if (types.length) {
  importStr = `${importStr}
import { ${types.join(', ')}, Collapse } from 'antd';`;
}

importStr = `${importStr}
import styles from '../../../../style.css';

const { Panel } = Collapse;`;

if (types.includes('Select')) {
  importStr = `${importStr}
const { Option } = Select;
`;
}

let contentStr = `
const Header = (props) => {
  const { limit } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Collapse
        defaultActiveKey={['1']}
      >
        <Panel
          header="搜索查询"
          key="1"
        >
          <div className={styles.header_wrap_view}>`;

if (headers.length) {
  headers.forEach(v => {
    switch (v.type) {
      case 'Select':
        contentStr = `${contentStr}
            <div className={styles.inner_list}>
              <span className={styles.labWidth}>${v.label}:</span>
              <Select
                size="middle"
                className={styles.inputWidth}
                data-bind={limit.a}
              >
                {
                  [].map(v => (
                    <Option key={v.code} value={v.code}>{v.title}</Option>
                  ))
                }
              </Select>
            </div>`;
        break;
      case 'Input':
        contentStr = `${contentStr}
            <div className={styles.inner_list}>
              <span className={styles.labWidth}>${v.label}:</span>
              <Input
                size="middle"
                className={styles.inputWidth}
                data-bind={limit.a}
              />
            </div>`;
        break;
    }

  })
}

contentStr = `${contentStr}
          </div>
        </Panel>
      </Collapse>
    </form>
  );
};

Header.propTypes = {
  limit: PropTypes.shape().isRequired,
};
export default Header;
`;
headerString = `${importStr}${contentStr}`;

module.exports = {
  headerString,
};
