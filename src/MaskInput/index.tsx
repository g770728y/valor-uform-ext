import { IMaskInput } from "react-imask";

import * as React from "react";

interface Props {
  mask: string;
  value: string;
  onChange: any;
}
const MaskInput: React.FC<Props> = ({
  value,
  onChange,
  mask,
  ...restIMaskProps
}) => {
  return (
    <IMaskInput
      mask={mask}
      className={"ant-input"}
      lazy={false}
      placeholderChar="_"
      value={value}
      unmask={true} // true|false|'typed'
      onAccept={(value: any, mask: any) => onChange(value)}
      {...restIMaskProps}
    />
  );
};

export default MaskInput;
