import React, { Component } from 'react';
import { AppendableSelect } from 'valor-uform-ext';
import {
  SchemaForm,
  Field,
  Submit,
  registerFormField,
  connect
} from '@uform/antd';
import 'antd/dist/antd.css';
import * as R from 'rambda';

registerFormField(
  'appendable-select',
  connect()(props => <AppendableSelect {...props} />)
);

const onCreate = () => {
  return Promise.resolve();
};

const getData = () => {
  console.log('getData');
  return Promise.resolve([
    { id: (Math.random() * 10) | 0, label: '一' },
    { id: (Math.random() * 10) | 0, label: '二' }
  ]);
};

export default () => {
  return (
    <SchemaForm
      value={{ a: 2 }}
      onSubmit={values => {
        console.log('submit:', values);
      }}
    >
      <Field
        type="string"
        name="a"
        x-component="appendable-select"
        x-props={{
          disabled: false,
          getData,
          onCreate,
          normalize: R.identity
        }}
      />
      <Submit />
    </SchemaForm>
  );
};
