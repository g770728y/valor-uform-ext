import * as React from 'react';
import { SchemaForm, Submit } from '@uform/antd';

interface Props {
  queryFields: React.ReactChild[];
  queries: Record<string, any>;
  setQueries: (q: Record<string, any>) => void;
}

const Query: React.FC<Props> = ({ queries, queryFields, setQueries }) => {
  return (
    <SchemaForm
      layout={'inline'}
      defaultValue={queries || {}}
      onSubmit={(values: any) => setQueries({ ...queries, ...values })}
    >
      {...queryFields as any}
      <Submit showLoading={true}>查询</Submit>
    </SchemaForm>
  );
};
export default Query;
