import * as React from 'react';
import { CodeInput } from 'valor-uform-ext';
import Mock from 'mockjs';
import SchemaForm, { connect, Field, registerFormField } from '@uform/react';

registerFormField('code-input', connect()(props => <CodeInput {...props} />));

const CodeInputTest = () => {
  return (
    <SchemaForm
      value={{
        html: '<div>testing</div>',
        css: '.xx{color:red}',
        javascript: 'function() {}'
      }}
      onChange={values => console.log('onSubmit code:', values)}
    >
      <Field
        name="html"
        title="html源码"
        x-component="code-input"
        x-props={{
          mode: 'text/html',
          remark: '这里是很长很长的描述'
        }}
      />

      <Field
        name="css"
        title="css源码"
        x-component="code-input"
        x-props={{
          mode: 'css'
        }}
      />

      <Field
        name="javascript"
        title="javascript源码"
        x-component="code-input"
        x-props={{
          mode: 'javascript'
        }}
      />
    </SchemaForm>
  );
};

export default CodeInputTest;
