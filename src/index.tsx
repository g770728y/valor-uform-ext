import * as React from "react";
import { connect, registerFormField } from "@formily/antd";

import TreeSelectInput from "./TreeSelectInput";
export { TreeSelectInput };

import AppendableSelect from "./AppendableSelect";
export { AppendableSelect };

import PickerDialog from "./PickerDialog";
export { PickerDialog };

import PickerInput from "./PickerInput";
export { PickerInput };

import CodeInput from "./CodeInput";
export { CodeInput };

import DataSelect from "./DataSelect";
export { DataSelect };

import NumberRangeInput from "./NumberRangeInput";
import MaskInput from "./MaskInput";
export { NumberRangeInput };

registerFormField(
  "code-input",
  (connect() as any)((props: any) => <CodeInput {...props} />)
);

registerFormField(
  "tree-select",
  (connect() as any)((props: any) => <TreeSelectInput {...props} />)
);

registerFormField(
  "picker-input",
  (connect() as any)((props: any) => <PickerInput {...props} />)
);

registerFormField(
  "data-select",
  (connect() as any)((props: any) => <DataSelect {...props} />)
);

registerFormField(
  "number-range",
  (connect() as any)((props: any) => <NumberRangeInput {...props} />)
);

registerFormField(
  "mask-input",
  (connect() as any)((props: any) => <MaskInput {...props} />)
);
