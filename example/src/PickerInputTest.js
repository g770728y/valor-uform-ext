import * as React from 'react';
import Mock from 'mockjs';
import SchemaForm, {
  Field,
  Submit,
  registerFormField,
  connect
} from '@uform/antd';
import { PickerInput } from 'valor-uform-ext';

registerFormField(
  'picker-input',
  connect()(props => <PickerInput {...props} />)
);

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '体重', dataIndex: 'weight', key: 'weight' }
];

const allData = Mock.mock({
  'array|30-100': [
    {
      id: '@increment',
      name: '@cname',
      age: '@integer(10,100)',
      weight: '@integer(10,100)'
    }
  ]
}).array;

const getData = ({ pageNo, pageSize, ...params }) => {
  console.log('params', params);
  return Promise.resolve(allData)
    .then(result => ({
      meta: { pageNum: 1, pageSize: 10, num: result.length },
      entities: result.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    }))
    .then(result => ({
      ...result,
      meta: {
        pageNo: result.meta.pageNum,
        pageSize: result.meta.pageSize,
        total: result.meta.num
      }
    }));
};

const queryFields = (
  <React.Fragment>
    <Field type="string" name="p1" x-props={{ placeholder: 'input p1' }} />
    <Field type="string" name="p2" x-props={{ placeholder: 'input p2' }} />
  </React.Fragment>
);
const PickerInputTest = () => {
  return (
    <SchemaForm value={{}} onSubmit={values => console.log('onSubmit', values)}>
      <Field
        name="field0"
        title="字段名称"
        x-component="picker-input"
        x-props={{
          onCreate: () => console.log('onCreate'),
          labelField: 'name',
          picker: {
            columns,
            getData,
            queryFields
          }
        }}
      />
      <Submit />
    </SchemaForm>
  );
};

export default PickerInputTest;
