import * as React from "react";
import { ModalContext } from "react-promisify-modal";
import { Button } from "antd";
import { PickerDialog } from "valor-uform-ext";
import Mock from "mockjs";
import { Field } from "@formily/antd";

const columns = [
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "年龄", dataIndex: "age", key: "age" },
  { title: "体重", dataIndex: "weight", key: "weight" }
];

const allData = Mock.mock({
  "array|30-100": [
    {
      id: "@increment",
      name: "@cname",
      age: "@integer(10,100)",
      weight: "@integer(10,100)"
    }
  ]
}).array;

const getData = ({ pageNo, pageSize, ...params }) => {
  console.log("params", params);
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
    <Field type="string" name="p1" x-props={{ placeholder: "input p1" }} />
    <Field type="string" name="p2" x-props={{ placeholder: "input p2" }} />
  </React.Fragment>
);

const PickerDialogPicker = () => {
  const { openModal } = React.useContext(ModalContext);
  const [record, setRecord] = React.useState();

  const _openModal = () => {
    const actions = {
      onCreate: () => {
        allData.shift({ id: "gy", name: "gy", age: 42, weight: 60 });
        return Promise.resolve();
      },
      onUpdate: id => {
        const index = allData.findIndex(data => id === data.id);
        allData[index].age = allData[index].age + 10;
        return Promise.resolve();
      },
      onDelete: id => {
        const index = allData.findIndex(data => id === data.id);
        allData.splice(index, index + 1);
        return Promise.resolve();
      }
    };
    openModal(args => (
      <PickerDialog
        {...args}
        id="id"
        title="选择一只猪猪"
        columns={columns}
        getData={getData}
        defaultQueries={{}}
        queryFields={queryFields}
        actions={actions}
      />
    )).then(result => setRecord(result));
  };

  return (
    <div>
      <Button onClick={_openModal}>打开对话框, 选择后将返回值</Button>
      <div>返回值为: {JSON.stringify(record)}</div>
    </div>
  );
};
export default PickerDialogPicker;
