import { ifElseAsync } from "rambdax";
import { IMaskInput } from "react-imask";

import * as React from "react";

interface Props {}
const MobileInput: React.FC<Props> = ({
  value,
  onChange
}: {
  value: string;
  onChange: any;
}) => {
  return (
    <IMaskInput
      className={"ant-input"}
      mask="000-0000-0000"
      lazy={false}
      placeholderChar="_"
      value={value}
      unmask={true} // true|false|'typed'
      onAccept={(value: any, mask: any) => onChange(value)}
    />
  );
};

export default MobileInput;
