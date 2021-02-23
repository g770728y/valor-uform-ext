import * as React from "react";
import Mock from "mockjs";
import SchemaForm, {
  Field,
  Submit,
  registerFormField,
  connect
} from "@formily/antd";
import { DataSelect } from "valor-uform-ext";

registerFormField("data-select", connect()(props => <DataSelect {...props} />));

const allData = Mock.mock({
  "array|30-100": [
    {
      id: "@increment",
      name: "@cname"
    }
  ]
}).array;

const getData = () => {
  return Promise.resolve(allData);
};

const DataSelectTest = () => {
  return (
    <SchemaForm value={{}} onSubmit={values => console.log("onSubmit", values)}>
      <Field
        name="field0"
        title="字段名称"
        x-component="data-select"
        x-props={{
          labelField: "name",
          getData
        }}
      />
      <Submit />
    </SchemaForm>
  );
};

export default DataSelectTest;
