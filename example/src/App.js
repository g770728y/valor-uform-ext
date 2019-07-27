import React, { Component } from 'react';
import 'valor-uform-ext';
import { SchemaForm, Field, Submit } from '@uform/antd';
import 'antd/dist/antd.css';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1'
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1'
  }
];

export default class App extends Component {
  render() {
    return (
      <SchemaForm
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Field
          type="string"
          name="a"
          x-component="tree-select"
          x-props={{ treeData }}
        />
        <Submit />
      </SchemaForm>
    );
  }
}
