import React, { Component } from 'react';
import TreeSelectTest from './TreeSelectTest';
import AppendableSelectTest from './AppendableSelectTest';
import { ModalProvider } from 'react-promisify-modal';
import PickerDialogTest from './PickerDialogTest';
import PickerInputTest from './PickerInputTest';
import CodeInputTest from './CodeInput';

export default () => {
  return (
    <ModalProvider>
      <div>
        <h1>PickerInput</h1>
        <PickerInputTest />
        <hr />
        <h1>PickerDialog</h1>
        <PickerDialogTest />
        <hr />
        <h1>TreeSelect</h1>
        <TreeSelectTest />
        <hr />
        <h1>AppendableSelect</h1>
        <AppendableSelectTest />
        <hr />
        <h1>CodeInput</h1>
        <CodeInputTest />
      </div>
    </ModalProvider>
  );
};
