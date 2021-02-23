import React, { Component } from "react";
import TreeSelectTest from "./TreeSelectTest";
import AppendableSelectTest from "./AppendableSelectTest";
import { ModalProvider } from "react-promisify-modal";
import PickerDialogTest from "./PickerDialogTest";
import PickerInputTest from "./PickerInputTest";
import CodeInputTest from "./CodeInput";
import DataSelectTest from "./DataSelectTest";
import NumberRangeTest from "./NumberRangeTest";
import { setup } from "@formily/antd-components";

// 注册formily组件
setup();

export default () => {
  return (
    <ModalProvider>
      <div>
        <h1>DataSelect</h1>
        <DataSelectTest />
        <hr />
        <h1>PickerInput</h1>
        <PickerInputTest />
        <hr />
        <h1>PickerDialog</h1>
        <PickerDialogTest />
        <hr />
        <h1>TreeSelect</h1>
        <TreeSelectTest />
        <hr />
        <h1>AppendableSelect(未完成)</h1>
        {/* <AppendableSelectTest /> */}
        <hr />
        <h1>CodeInput</h1>
        <CodeInputTest />
        <hr />
        <h1>NumberRange</h1>
        <NumberRangeTest />
      </div>
    </ModalProvider>
  );
};
