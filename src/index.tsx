import * as React from 'react';
import { connect, registerFormField } from '@uform/antd';

import TreeSelectInput from './TreeSelectInput';
export { TreeSelectInput };

import AppendableSelect from './AppendableSelect';
export { AppendableSelect };

import PickerDialog from './PickerDialog';
export { PickerDialog };

import PickerInput from './PickerInput';
export { PickerInput };

import DataSelect from './DataSelect';
export { DataSelect };

registerFormField(
  'tree-select',
  (connect() as any)((props: any) => <TreeSelectInput {...props} />)
);

registerFormField(
  'picker-input',
  (connect() as any)((props: any) => <PickerInput {...props} />)
);

registerFormField(
  'data-select',
  (connect() as any)((props: any) => <DataSelect {...props} />)
);
