import * as React from 'react';
import { TreeSelect } from 'antd';

type Props = any;

const TreeSelectInput: React.FC<Props> = (props: any) => {
  return (
    <TreeSelect
      style={{ width: 300 }}
      value={props.value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={props.treeData}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={props.onChange}
    />
  );
};

export default TreeSelectInput;
