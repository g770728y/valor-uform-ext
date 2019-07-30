import * as React from 'react';
import { TreeSelect } from 'antd';
import { mapTreeNode } from 'valor-app-utils';

/* treeData格式: 必须如下
[
  {id: 1, children: [
    {id: 2, children:[]}
  ]}
]
*/
type Props = {
  value: any;
  disabled?: boolean;
  onChange: (e: any) => void;
  treeData?: [];
  // 从后台获取treeData的回调
  getTreeData?: () => Promise<any>;
  // 例如: 将{id:1, children, name} => {id:1, children, title, key}
  normalize: (node: any) => any;
};

const TreeSelectInput: React.FC<Props> = ({
  value,
  disabled,
  onChange,
  treeData,
  getTreeData,
  normalize
}) => {
  if (!treeData && !getTreeData)
    throw new Error('必须提供treeData 或 getTreeData!');

  const [tree, setTree] = React.useState([]);

  React.useEffect(() => {
    const p = treeData ? Promise.resolve(treeData) : getTreeData!();
    p.then(data =>
      (data || []).map((node: any) => mapTreeNode(node, normalize))
    ).then(setTree);
  }, []);

  return (
    <TreeSelect
      disabled={disabled || false}
      style={{ width: 300 }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={tree}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default TreeSelectInput;
