import * as React from 'react';
import { Button, Modal, Alert } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import Text from 'antd/lib/typography/Text';

interface Props {
  mode: 'text/html' | 'javascript' | 'css';
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
  remark?: string;
}

const CodeInput: React.FC<Props> = ({
  value,
  onChange,
  mode,
  disabled,
  remark
}) => {
  const valueRef = React.useRef(value);
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        size={'small'}
        disabled={disabled}
      >
        {'编辑'}
      </Button>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.react-codemirror2 {height:100%;flex:0 1 auto;} .CodeMirror {height:100%;}'
        }}
      ></style>
      <Modal
        title={'编辑源代码'}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          onChange(valueRef.current);
          setVisible(false);
        }}
        okText="确定"
        cancelText="取消"
        width={800}
        bodyStyle={{ padding: 0, height: 600 }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {remark && <Alert type="warning" message={remark} />}
          <CodeMirror
            options={{
              mode: mode,
              theme: 'default',
              lineNumbers: true,
              autoCloseBrackets: true,
              autoCloseTags: true
            }}
            value={value}
            onChange={(editor, data, value) => {
              valueRef.current = value;
            }}
          />
        </div>
      </Modal>
    </>
  );
};
export default CodeInput;
