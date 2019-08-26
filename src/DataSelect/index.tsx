import * as React from 'react';
import * as R from 'rambda';
import { Button, Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

interface Props extends SelectProps<any> {
  // 创建方法, 创建时, 应该用openModal显示一个对话框, 最后返回一个Promise
  idField?: string;
  labelField?: string;

  data?: Identity[];
  // 不需要返回分页数据
  getData?: () => Promise<Identity[]>;
}
const { Option } = Select;

const DataSelect: React.FC<Props> = ({
  disabled,
  idField = 'id',
  labelField = 'label',
  data,
  getData,
  ...selectProps
}) => {
  const [dataSource, setDataSource] = React.useState<any[]>(data || []);

  React.useEffect(() => {
    if (getData) {
      getData().then(setDataSource);
    }
  }, []);

  return (
    <Select {...selectProps}>
      {dataSource!.map(it => (
        <Option key={it[idField]} value={it[idField]}>
          {it[labelField]}
        </Option>
      ))}
    </Select>
  );
};

export default DataSelect;
