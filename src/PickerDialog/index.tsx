import * as React from "react";
import { Modal, Button } from "antd";
import Tabler from "./Tabler";
import { ColumnProps } from "antd/lib/table";
import * as R from "rambda";
import Query from "./Query";
import { appCache, AppCache } from "valor-app-utils";
import { PlusOutlined } from "@ant-design/icons";

export interface IPickerDialogActions {
  onCreate?: () => Promise<any>;
  onUpdate?: (id: any, record: any) => Promise<any>;
  onDelete?: (id: any) => Promise<any>;
}

export interface Props {
  // 如果有id, 表示需要缓存
  id?: string;
  // 是否多选
  multiple?: boolean;
  title?: string;
  show: boolean;
  onOk: (result: any) => void;
  onCancel: () => void;
  columns: ColumnProps<any>[];
  data?: Identity[];
  width?: number;
  getData?: (p: {
    pageNo: number;
    pageSize: number;
    [k: string]: any;
  }) => Promise<{ meta: PageMeta; entities: Identity[] }>;
  pageSize?: number;
  defaultQueries?: Record<string, any>;
  queryFields?: React.ReactChild[];
  actions?: IPickerDialogActions;
}
interface IModel {
  selection: Identity[];
  dataSource: any[];
  meta: PageMeta;
  queries: Record<string, any>;
}
const PickerDialog: React.FC<Props> = ({
  id,
  multiple,
  title,
  show,
  onOk,
  onCancel,
  width = 600,
  columns,
  data,
  getData,
  pageSize,
  defaultQueries,
  queryFields,
  actions
}) => {
  if (data && actions)
    throw new Error("PickerDialog: 不可同时提供data与actions");

  const unmountedRef = React.useRef<boolean>(false);
  const filledRef = React.useRef<boolean>(false);
  // 手动更新
  const [_, forceUpdate] = React.useState<number>(0);

  const modelRef = React.useRef<IModel>({
    dataSource: data || [],
    selection: [],
    meta: {
      pageSize: pageSize || 10,
      pageNo: 1,
      total: 0
    },
    queries: defaultQueries || {}
  });

  React.useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  const patchModel = (_model: Partial<IModel>) => {
    if (unmountedRef.current) return;

    const newModel = { ...modelRef.current, ..._model };
    modelRef.current = newModel;
    appCache.set(id || AppCache.DreamerId, newModel);

    // 手动更新
    forceUpdate(new Date().getTime());
  };

  const { meta, dataSource, selection, queries } = modelRef.current;

  const refetch = () => {
    if (getData) {
      getData({
        pageNo: meta.pageNo,
        pageSize: meta.pageSize,
        ...queries
      }).then(result => {
        if (!unmountedRef.current) {
          patchModel({
            dataSource: result.entities,
            meta: { ...meta, total: result.meta.total }
          });
        }
      });
    }
  };

  React.useEffect(() => {
    if (!filledRef.current) {
      const cache = appCache.get(id || AppCache.DreamerId);
      filledRef.current = true;
      if (cache) {
        // 不能设置selection,  会导出antd出现多个selection并且无法取消
        const { selection, ...rest } = cache;
        patchModel(rest);
        return;
      }
    }

    refetch();
  }, [meta.pageNo, queries]);

  const onSubmit = (selection: Identity[]) => {
    if (selection.length > 0) {
      const _selection = selection.map(it => ({
        ...it,
        _record_: true
      }));
      return onOk(multiple ? _selection : _selection[0]);
    }
  };

  const setCurrentPage = (pageNo: number) => {
    patchModel({ meta: { ...meta, pageNo } });
  };

  const handleCreate =
    actions && actions.onCreate
      ? () => {
          actions.onCreate!().then(refetch);
        }
      : undefined;

  const handleUpdate =
    actions && actions.onUpdate
      ? (id: any) => {
          actions.onUpdate!(id, dataSource.find(it => it.id === id)!).then(
            refetch
          );
        }
      : undefined;

  const handleDelete =
    actions && actions.onDelete
      ? (id: any) => {
          actions.onDelete!(id).then(refetch);
        }
      : undefined;

  return (
    <Modal
      width={width}
      title={title || "双击选择"}
      visible={show}
      onOk={() => onSubmit(selection)}
      onCancel={onCancel}
      okText={"确定"}
      cancelText={"取消"}
    >
      {queryFields && (
        <Query
          queryFields={queryFields}
          queries={queries}
          setQueries={(q: any) =>
            patchModel({
              queries: q,
              meta: { ...modelRef.current.meta, pageNo: 1 }
            })
          }
        />
      )}
      {handleCreate && (
        <div>
          <Button onClick={handleCreate!} type="link">
            <PlusOutlined />
            新建
          </Button>
        </div>
      )}
      <Tabler
        meta={meta}
        setCurrentPage={setCurrentPage}
        multiple={multiple}
        columns={columns}
        dataSource={dataSource}
        setSelection={(s: any) => patchModel({ selection: s })}
        selection={selection}
        onSubmit={onSubmit}
        actions={{ onUpdate: handleUpdate, onDelete: handleDelete }}
      />
    </Modal>
  );
};

export default PickerDialog;
