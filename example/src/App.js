import React, { Component } from 'react';
import TreeSelectTest from './TreeSelectTest';
import AppendableSelectTest from './AppendableSelectTest';
import { ModalProvider } from 'react-promisify-modal';
import PickerDialogTest from './PickerDialogTest';

export default () => {
  return (
    <ModalProvider>
      <div>
        <PickerDialogTest />
        <hr />
        <TreeSelectTest />
        <hr />
        <AppendableSelectTest />
      </div>
    </ModalProvider>
  );
};
