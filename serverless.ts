import type { AWS } from "@serverless/typescript";
import { resources as iamResources } from "./infra/lib/resources/iam";
import { resources as lambdaResources } from "./infra/lib/resources/lambda";
import { resources as rdsResources } from "./infra/lib/resources/rds";
import { resources as s3Resources } from "./infra/lib/resources/s3";

import { INFRA_CONFIG } from "./infra/lib/constants/infra.constants";
import { fileOperations as fileOperationsFunctions } from "./infra/lib/functions/file-operations";
import { healthCheck as healthCheckFunctions } from "./infra/lib/functions/health-check";
import {
  getBucketName,
  getResourceTags,
  getSecretsManagerName,
} from "./infra/lib/utils/common.util";

type AWSCustom = AWS & {
  provider: AWS["provider"] | (AWS["provider"] & AWS["provider"]["region"]);
};

const serverlessConfiguration: AWSCustom = {
  service: INFRA_CONFIG.stackPrefix,
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-prune-plugin",
    "serverless-deployment-bucket",
    "serverless-dotenv-plugin",
  ],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    stage: "dev",
    region: "us-east-1",
    memorySize: 512,
    timeout: 6,
    versionFunctions: false,
    apiGateway: {
      binaryMediaTypes: ["*/*"],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      STAGE: "${self:custom.stage}",
      RDS_SECRET_NAME: getSecretsManagerName("rds-aurora"),
      S3_FILE_DATA_BUCKET_NAME: getBucketName("file-data"),
    },
    logs: {
      restApi: {
        executionLogging: false,
      },
    },
    deploymentBucket: {},
    stackTags: getResourceTags(),
  },
  custom: {
    service: "my-service",
    stage: "${opt:stage, self:provider.stage}",
    region: "${opt:region, self:provider.region}",
    webpack: {
      includeModules: false,
    },
    esbuild: {
      bundle: true,
      minify: false,
      minifyWhitespace: true,
      sourcemap: true,
      exclude: [],
      target: "node20",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  package: {
    individually: true,
    patterns: [
      "!tests/**",
      "!serverless-configs/**",
      "!envs/**",
      "node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node",
      "!test_payloads/**",
      "prisma/schema.prisma",
    ],
  },
  functions: {
    ...healthCheckFunctions,
    ...fileOperationsFunctions,
  },
  resources: {
    Resources: {
      ...iamResources,
      ...lambdaResources,
      ...rdsResources,
      ...s3Resources,
    },
  },
};

module.exports = serverlessConfiguration;
