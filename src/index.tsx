import * as React from 'react';
import { connect, registerFormField } from '@uform/antd';
import TreeSelectInput from './TreeSelectInput';

registerFormField(
  'tree-select',
  (connect() as any)((props: any) => <TreeSelectInput {...props} />)
);
