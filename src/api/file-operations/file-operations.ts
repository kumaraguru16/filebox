import { ResponseModel } from "../../models/response.model";
import { FileOperationsService } from "../../services/file-operations.service";
import { logger } from "../../utils/logger.utils";

export class FileOperationsController {
  static async uploadFiles(event: any): Promise<ResponseModel> {
    logger.trace("Entering <FileOperationsController.uploadFiles>.");

    const uploadedFiles = await FileOperationsService.uploadFiles(event);

    logger.trace("Exiting <FileOperationsController.uploadFiles>: %o.");
    return { message: "Success", data: uploadedFiles };
  }

  static async getFileDetail(event: any): Promise<ResponseModel> {
    logger.trace("Entering <FileOperationsController.getFileDetail>.");

    const fileDetails = await FileOperationsService.getFileDetail(event);

    logger.trace("Exiting <FileOperationsController.getFileDetail>: %o.");
    return { message: "success", data: fileDetails };
  }

  static async toggleFileDetailVisibility(event: any): Promise<ResponseModel> {
    logger.trace(
      "Entering <FileOperationsController.toggleFileDetailVisibility>."
    );

    const toggleVisibilityFileDetailsResponse =
      await FileOperationsService.toggleFileDetailVisibility(event);

    logger.trace(
      "Exiting <FileOperationsController.toggleFileDetailVisibility>: %o."
    );
    return { message: "success", data: toggleVisibilityFileDetailsResponse };
  }

  static async deleteFileDetail(event: any): Promise<ResponseModel> {
    logger.trace("Entering <FileOperationsController.deleteFileDetail>.");

    const deleteFileDetailsResponse =
      await FileOperationsService.deleteFileDetail(event);

    logger.trace("Exiting <FileOperationsController.deleteFileDetail>: %o.");
    return { message: "success", data: deleteFileDetailsResponse };
  }
}
