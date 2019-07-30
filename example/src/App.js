import React, { Component } from 'react';
import TreeSelectTest from './TreeSelectTest';
import AppendableSelectTest from './AppendableSelectTest';
import { ModalProvider } from 'react-promisify-modal';
import PickerDialogTest from './PickerDialogTest';
import PickerInputTest from './PickerInputTest';

export default () => {
  return (
    <ModalProvider>
      <div>
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
