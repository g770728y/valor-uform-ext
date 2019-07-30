import React, { Component } from 'react';
import TreeSelectTest from './TreeSelectTest';
import AppendableSelectTest from './AppendableSelectTest';
import { ModalProvider } from 'react-promisify-modal';
import PickerDialogTest from './PickerDialogTest';
import PickerInputTest from './PickerInputTest';
import DataSelectTest from './DataSelectTest';

export default () => {
  return (
    <ModalProvider>
      <div>
        <DataSelectTest />
        <hr />
        <PickerInputTest />
        <hr />
        <PickerDialogTest />
        <hr />
        <TreeSelectTest />
        <hr />
        <AppendableSelectTest />
      </div>
    </ModalProvider>
  );
};
