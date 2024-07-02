import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_PRESIGNED_URL_EXPIRATION } from "../constants/application.constant";

const s3Config: S3ClientConfig = {};

export const s3Client = new S3Client(s3Config);

export async function getSignedUrlForGetObject(
  params: GetObjectCommandInput
): Promise<string> {
  const command = new GetObjectCommand(params);
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: S3_PRESIGNED_URL_EXPIRATION,
  });
  return signedUrl;
}

export async function putS3Object(params: PutObjectCommandInput) {
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
}
