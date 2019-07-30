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
      {...queryFields}
      <Submit title="查询" />
    </SchemaForm>
  );
};
export default Query;
