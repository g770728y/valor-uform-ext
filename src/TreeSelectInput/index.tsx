import * as React from "react";
import { TreeSelect } from "antd";
import { mapTreeNode } from "valor-app-utils";

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
  treeData?: any[];
  // 从后台获取treeData的回调
  getTreeData?: () => Promise<any>;
  // 例如: 将{id:1, children, name} => {id:1, children, title, key}
  normalize: (node: any) => any;
  width?: number;
};

const TreeSelectInput: React.FC<Props> = ({
  value,
  disabled,
  onChange,
  treeData,
  getTreeData,
  normalize,
  width
}) => {
  if (!treeData && !getTreeData)
    throw new Error("必须提供treeData 或 getTreeData!");

  const unmountedRef = React.useRef<boolean>(false);
  const [tree, setTree] = React.useState([]);

  React.useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  React.useEffect(() => {
    const p = treeData ? Promise.resolve(treeData) : getTreeData!();
    p.then((data: any) => {
      if (unmountedRef.current) {
        throw new Error("TreeSelectInput 已unmounted, 无法setState, 已忽略");
      }
      return data;
    })
      .then(data =>
        (data || []).map((node: any) => mapTreeNode(node, normalize))
      )
      .then(setTree)
      .catch(e => console.error(e));
  }, []);

  return (
    <TreeSelect
      disabled={disabled || false}
      style={{ width: width || 300 }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      treeData={tree}
      placeholder="请选择"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default TreeSelectInput;
