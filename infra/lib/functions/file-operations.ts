import type { AWS } from "@serverless/typescript";
import {
  getLambdaCommonPermissions,
  getLambdaFuncName,
} from "../utils/common.util";

type FunctionInterface = AWS["functions"];

export const fileOperations: FunctionInterface = {
  uploadFiles: {
    handler: "src/api/file-operations.uploadFiles",
    name: getLambdaFuncName("upload-files"),
    events: [
      {
        http: {
          method: "post",
          path: "file-detail/upload",
        },
      },
    ],
    ...getLambdaCommonPermissions(),
  },

  getFileDetail: {
    handler: "src/api/file-operations.getFileDetail",
    name: getLambdaFuncName("get-file-detail"),
    events: [
      {
        http: {
          method: "get",
          path: "file-detail",
        },
      },
    ],
    ...getLambdaCommonPermissions(),
  },

  toggleFileDetailVisibility: {
    handler: "src/api/file-operations.toggleFileDetailVisibility",
    name: getLambdaFuncName("toggle-file-detail"),
    events: [
      {
        http: {
          method: "patch",
          path: "file-detail/toggleVisibility",
        },
      },
    ],
    ...getLambdaCommonPermissions(),
  },

  deleteFileDetail: {
    handler: "src/api/file-operations.deleteFileDetail",
    name: getLambdaFuncName("delete-file-detail"),
    events: [
      {
        http: {
          method: "delete",
          path: "file-detail",
        },
      },
    ],
    ...getLambdaCommonPermissions(),
  },
};
