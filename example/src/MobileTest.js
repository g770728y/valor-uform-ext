import * as React from "react";
import SchemaForm, {
  connect,
  registerFormField,
  Field,
  Submit
} from "@formily/antd";

const NumberRangeTest = () => {
  return (
    <SchemaForm
      value={{ s: "" }}
      onSubmit={values => console.log("onSubmit", values)}
      layout={"horizontal"}
    >
      <Field name="s" title="手机号" x-component="mobile-input" />
      <Submit />
    </SchemaForm>
  );
};

export default NumberRangeTest;
