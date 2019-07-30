import * as React from 'react';
import { Select, Button } from 'antd';

interface Props {
  value: ID;
  onChange: (id: ID) => void;
  disabled?: boolean;
  getData: () => Promise<any>;
  // 创建方法, 创建时, 应该用openModal显示一个对话框, 最后返回一个Promise
  onCreate: () => Promise<void>;
  idField?: string;
  labelField?: string;
}

const { Option } = Select;

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};
const AppendableSelect: React.FC<Props> = ({
  onCreate,
  getData,
  labelField = 'label',
  idField = 'id',
  ...props
}) => {
  const [data, setData] = React.useState([]);
  const [dirty, setDirty] = React.useState(true);
  console.warn(
    '暂时没用到AppendableSelect, 所以并未真正做完. 用到时, 请补充相关逻辑'
  );

  React.useEffect(() => {
    if (dirty) {
      getData()
        .then((data: any) => setData(data))
        .then(() => setDirty(false));
    }
  }, [dirty]);

  const onCreateClick = () => onCreate().then(() => setDirty(true));

  return (
    <div style={containerStyle}>
      <Select {...props}>
        {data.map((d: any) => (
          <Option value={d[idField]} key={d[idField]}>
            {d[labelField]}
          </Option>
        ))}
      </Select>
      <div style={{ width: 10, flex: 'none' }} />
      <Button onClick={onCreateClick}>新建</Button>
    </div>
  );
};

export default AppendableSelect;
