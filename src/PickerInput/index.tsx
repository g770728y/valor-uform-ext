import * as React from 'react';
import * as R from 'rambda';
import { Button } from 'antd';
import { ModalContext, ModalProvider } from 'react-promisify-modal';
import { PickerDialog } from '..';
import { Props as PickerProps } from '../PickerDialog';

interface Props {
  value: Identity;
  onChange: (entity: Identity) => void;
  disabled?: boolean;
  // 创建方法, 创建时, 应该用openModal显示一个对话框, 最后返回一个Promise
  onCreate: () => Promise<void>;
  labelField?: string;

  picker: Partial<PickerProps>;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const PickerInput_: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  onCreate,
  labelField = 'label',
  picker
}) => {
  const { openModal } = React.useContext(ModalContext);
  console.log(openModal);
  const onPicker = () => {
    openModal((args: any) => <PickerDialog {...args} {...picker} />).then(
      (result: any) => onChange(result)
    );
  };
  const spacer = <div style={{ width: 10, flex: 'none' }} />;

  return (
    <div style={containerStyle}>
      {value && value[labelField] ? (
        <>
          <span>{value[labelField]}</span>
          {spacer}
        </>
      ) : (
        <>
          <span>尚未选择</span>
          {spacer}
        </>
      )}
      <Button onClick={onPicker} size="small" disabled={disabled}>
        {value && !R.isEmpty(value) ? '选择...' : '重选...'}
      </Button>
      {spacer}
      <Button onClick={onCreate} size="small" disabled={disabled}>
        新建
      </Button>
    </div>
  );
};

const PickerInput: React.FC<Props> = props => (
  <ModalProvider>
    <PickerInput_ {...props} />
  </ModalProvider>
);

export default PickerInput;
