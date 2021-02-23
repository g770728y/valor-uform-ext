import * as React from "react";
import { Button, Select } from "antd";
import { SelectProps } from "antd/lib/select";

interface Props extends SelectProps<any> {
  // 创建方法, 创建时, 应该用openModal显示一个对话框, 最后返回一个Promise
  idField?: string;
  labelField?: string;
  // 如果允许搜索, 那么则支持输入
  searchable?: boolean;

  data?: Identity[];
  // 不需要返回分页数据
  getData?: () => Promise<Identity[]>;
}
const { Option } = Select;

const DataSelect: React.FC<Props> = ({
  disabled,
  idField = "id",
  labelField = "label",
  data,
  getData,
  searchable = false,
  ...selectProps
}) => {
  const unmountedRef = React.useRef<boolean>(false);
  const [dataSource, setDataSource] = React.useState<any[]>(data || []);

  React.useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  React.useEffect(() => {
    if (getData) {
      getData().then(data => {
        if (!unmountedRef.current) {
          setDataSource(data);
        }
      });
    }
  }, []);

  return (
    <Select
      showSearch={!!searchable}
      filterOption={searchable ? (input, options) => {
        return (
          (options?.value + "").indexOf(input) >= 0
        );
      } : undefined}
      {...selectProps}
    >
      {dataSource!.map(it => (
        <Option key={it[idField]} value={it[idField]}>
          {it[labelField]}
        </Option>
      ))}
    </Select>
  );
};

export default DataSelect;
