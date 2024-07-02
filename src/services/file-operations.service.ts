import {
  GetObjectCommandInput,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import * as parser from "lambda-multipart-parser";
import * as mime from "mime-types";
import { S3_FILE_DATA_BUCKET_NAME } from "../constants/application.constant";
import { FileDetailsDao } from "../dao/file-details.dao";
import {
  getSignedUrlForGetObject,
  putS3Object,
} from "../integrations/s3Client";
import {
  RequestFileDetailModel,
  ResponseGetFileDetailModel,
} from "../models/file-details.model";
import { ApiHelper } from "../utils/api.util";
import { validateFileSize, validateFileType } from "../utils/file.util";
import { logger } from "../utils/logger.utils";

export class FileOperationsService {
  static async uploadFiles(event: any): Promise<any> {
    logger.trace(
      "Entering <FileOperationsService.uploadFiles>, event: %o",
      event
    );

    const { files } = await parser.parse(event);

    await Promise.all(
      files.map(async (file) => {
        validateFileSize(file);
        validateFileType(file.contentType);
      })
    );

    const createS3FileName = files.map((file) => {
      const extension = `${mime.extension(file.contentType)}`;
      const s3FileName = `${file.filename}-${randomUUID()}.${extension}`;
      return { ...file, extension, s3FileName };
    });

    const s3FilesParam = createS3FileName.map((file) => {
      return {
        Body: file.content,
        Bucket: S3_FILE_DATA_BUCKET_NAME,
        Key: file.s3FileName,
        ContentType: file.contentType,
      };
    });

    await Promise.all(
      s3FilesParam.map(async (file: PutObjectCommandInput) => {
        await putS3Object(file);
      })
    );

    const fileDetails: RequestFileDetailModel[] = createS3FileName.map(
      (file) => {
        return {
          s3FileName: file.s3FileName,
          fileName: file.filename,
          fileType: file.extension,
          fileSize: file.content.length,
        };
      }
    );

    const fileDetailCreated =
      await FileDetailsDao.createFileDetail(fileDetails);

    logger.trace("Exiting <FileOperationsService.uploadFiles>");
    return fileDetailCreated;
  }

  static async getFileDetail(event: any): Promise<ResponseGetFileDetailModel> {
    logger.trace(
      "Entering <FileOperationsService.getFileDetail>, event: %o",
      event
    );

    const { queryStringParameters } = event;
    const page = parseInt(queryStringParameters.page as string, 10) || 1;
    let limit = parseInt(queryStringParameters.limit as string, 10) || 10;
    const showHidden = JSON.parse(queryStringParameters.showHidden || "false");

    if (limit > 50) {
      limit = 50;
    }

    let getFileDetails: ResponseGetFileDetailModel =
      await FileDetailsDao.getFileDetail({
        page,
        limit,
        showHidden,
      });

    const preSignedUrls = await Promise.all(
      getFileDetails.fileDetails.map(async (file) => {
        const params: GetObjectCommandInput = {
          Bucket: S3_FILE_DATA_BUCKET_NAME,
          Key: file.s3FileName,
        };
        const fileUrl = await getSignedUrlForGetObject(params);
        return { ...file, fileUrl };
      })
    );

    getFileDetails.fileDetails = preSignedUrls.map(
      ({ s3FileName, ...rest }) => rest
    );

    logger.trace("Exiting <FileOperationsService.getFileDetail>");
    return getFileDetails;
  }

  static async toggleFileDetailVisibility(event: any): Promise<any> {
    logger.trace(
      "Entering <FileOperationsService.toggleFileDetailVisibility>, event: %o",
      event
    );

    const requestPayload = ApiHelper.getRequestPayload(event);

    if (!requestPayload.ids && requestPayload.ids.length > 0) {
      throw Error("The ID value is empty.");
    }

    const toggleVisibilityFileDetailsResponse =
      await FileDetailsDao.toggleFileDetailVisibility({
        ids: requestPayload.ids,
        hidden: requestPayload.hidden,
      });

    logger.trace("Exiting <FileOperationsService.toggleFileDetailVisibility>");
    return toggleVisibilityFileDetailsResponse;
  }

  static async deleteFileDetail(event: any): Promise<any> {
    logger.trace(
      "Entering <FileOperationsService.deleteFileDetail>, event: %o",
      event
    );

    const requestPayload = ApiHelper.getRequestPayload(event);

    if (!requestPayload.ids && requestPayload.ids.length > 0) {
      throw Error("The ID value is empty.");
    }

    const deleteFileDetailsResponse = await FileDetailsDao.deleteFileDetail({
      ids: requestPayload.ids,
    });

    logger.trace("Exiting <FileOperationsService.deleteFileDetail>");
    return deleteFileDetailsResponse;
  }
}
