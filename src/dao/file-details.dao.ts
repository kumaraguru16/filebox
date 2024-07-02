import {
  RequestDeleteFileDetailModel,
  RequestFileDetailModel,
  RequestGetFileDetailModel,
  RequestToggleFileDetailVisibilityModel,
  ResponseFileDetailModel,
  ResponseGetFileDetailModel,
} from "../models/file-details.model";
import { logger } from "../utils/logger.utils";
import { prisma } from "../utils/prisma.util";

export class FileDetailsDao {
  static async createFileDetail(
    fileDetailData: RequestFileDetailModel[]
  ): Promise<any> {
    logger.trace(
      "Entering <FileDetailsDao.createFileDetail>, Request payload: %o.",
      fileDetailData
    );
    const fileDetailCreated: any = await prisma.fileDetails.createMany({
      data: fileDetailData,
    });

    logger.trace(
      "Exiting <FileDetailsDao.createFileDetail>: %o.",
      fileDetailCreated
    );
    return fileDetailCreated;
  }

  static async getFileDetail({
    page,
    limit,
    showHidden,
  }: RequestGetFileDetailModel): Promise<ResponseGetFileDetailModel> {
    logger.trace(
      "Entering <FileDetailsDao.getFileDetail>, Request payload: ",
      page,
      limit,
      showHidden
    );

    const conditions = {
      where: {
        deletedAt: null,
        ...(!showHidden ? { hidden: showHidden } : {}),
      },
    };

    const totalFileDetails: number = await prisma.fileDetails.count(conditions);

    const fileDetails: ResponseFileDetailModel[] =
      await prisma.fileDetails.findMany({
        skip: (page - 1) * limit,
        take: limit,
        ...conditions,
      });

    logger.trace("Exiting <FileDetailsDao.getFileDetail>: %o.", fileDetails);
    return {
      totalFileDetails,
      page,
      totalPages: Math.ceil(fileDetails.length / limit),
      fileDetails,
    };
  }

  static async toggleFileDetailVisibility({
    ids,
    hidden,
  }: RequestToggleFileDetailVisibilityModel): Promise<any> {
    logger.trace(
      "Entering <FileDetailsDao.toggleFileDetailVisibility>, Request payload: ",
      ids
    );

    const toggleVisibilityFileDetailsResponse =
      await prisma.fileDetails.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          hidden,
        },
      });

    logger.trace(
      "Exiting <FileDetailsDao.toggleFileDetailVisibility>: %o.",
      toggleVisibilityFileDetailsResponse
    );
    return toggleVisibilityFileDetailsResponse;
  }

  static async deleteFileDetail({
    ids,
  }: RequestDeleteFileDetailModel): Promise<any> {
    logger.trace(
      "Entering <FileDetailsDao.deleteFileDetail>, Request payload: ",
      ids
    );

    const deleteFileDetailsResponse = await prisma.fileDetails.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });

    logger.trace(
      "Exiting <FileDetailsDao.deleteFileDetail>: %o.",
      deleteFileDetailsResponse
    );
    return deleteFileDetailsResponse;
  }
}
