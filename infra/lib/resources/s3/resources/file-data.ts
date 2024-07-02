import { S3 } from "../../../interfaces/s3.interface";
import { getBucketName } from "../../../utils/common.util";

export const S3FileDataBucket: S3 = {
  Type: "AWS::S3::Bucket",
  Properties: {
    BucketName: getBucketName("file-data"),
    VersioningConfiguration: {
      Status: "Enabled",
    },
    CorsConfiguration: {
      CorsRules: [
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
          AllowedOrigins: ["*"],
          MaxAge: 3600,
        },
      ],
    },
  },
};
