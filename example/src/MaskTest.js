import * as React from "react";
import SchemaForm, { Field, Submit } from "@formily/antd";

const NumberRangeTest = () => {
  return (
    <SchemaForm
      value={{ s0: "", s1: "15982211111" }}
      onSubmit={values => console.log("onSubmit", values)}
      layout={"horizontal"}
    >
      <Field
        name="s0"
        title="手机号"
        x-component="mask-input"
        x-props={{ mask: "000-0000-0000", unmask: true /*取15982211111*/ }}
      />
      <Field
        name="s1"
        title="桩号"
        x-component="mask-input"
        x-props={{ mask: "K0000+000.00", unmask: false /*取K1111+111.11*/ }}
      />
      <Submit />
    </SchemaForm>
  );
};

export default NumberRangeTest;
