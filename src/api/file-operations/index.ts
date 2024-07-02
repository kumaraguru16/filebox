import { WrapperUtil } from "../../utils/wrapper.util";
import { FileOperationsController } from "./file-operations";

class FileOperationsHandler {
  static uploadFiles = async (event: any, context: any) => {
    return WrapperUtil.apiWrapper(
      event,
      context,
      FileOperationsController.uploadFiles
    );
  };
  static getFileDetail = async (event: any, context: any) => {
    return WrapperUtil.apiWrapper(
      event,
      context,
      FileOperationsController.getFileDetail
    );
  };

  static toggleFileDetailVisibility = async (event: any, context: any) => {
    return WrapperUtil.apiWrapper(
      event,
      context,
      FileOperationsController.toggleFileDetailVisibility
    );
  };

  static deleteFileDetail = async (event: any, context: any) => {
    return WrapperUtil.apiWrapper(
      event,
      context,
      FileOperationsController.deleteFileDetail
    );
  };
}

export const uploadFiles = FileOperationsHandler.uploadFiles;
export const getFileDetail = FileOperationsHandler.getFileDetail;
export const toggleFileDetailVisibility =
  FileOperationsHandler.toggleFileDetailVisibility;

export const deleteFileDetail = FileOperationsHandler.deleteFileDetail;
