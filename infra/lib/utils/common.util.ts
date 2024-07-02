import { INFRA_CONFIG } from "../constants/infra.constants";
import type { AWS } from "@serverless/typescript";
import dotenv from "dotenv";
dotenv.config();

const envName = process.env.STAGE || "dev";
type FunctionInterface = AWS["functions"];

export const getResourceName = (resourceName: string): string => {
  let suffix: string = `-${envName}`;
  return `${INFRA_CONFIG.stackPrefix}-${resourceName}${suffix}`;
};

export const getResourceTags = (): { [k: string]: string } => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  return env ? env.tags : {};
};

export const getLambdaCommonPermissions = (): { [k: string]: any } => {
  const permissions: FunctionInterface = {
    config: {
      role: "GlobalLambdaFunctionRole",
      vpc: {
        securityGroupIds: [
          {
            Ref: "LambdaSecurityGroup",
          },
        ],
        subnetIds: getPrivateSubnets(),
      },
      dependsOn: ["GlobalLambdaFunctionRole"],
    },
  };
  return permissions.config;
};

export const getDBIdentifierName = (name: string) =>
  getResourceName(`${name}-identifier`);
export const getClusterMinCapacity = (): number => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  return env?.regions["us-east-1"].rds.MinCapacity || 0;
};
export const getClusterMaxCapacity = (): number => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  return env?.regions["us-east-1"].rds.MaxCapacity || 1;
};
export const getSecurityGroupName = (name: string): string =>
  getResourceName(`${name}-security-group`);
export const getBastionInstanceName = (name: string): string =>
  getResourceName(`${name}-instance`);

export const getDBSubnetGroupName = (name: string): string =>
  getResourceName(`${name}-subnet-group`);
export const getDatabaseName = (): string => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  return env?.regions["us-east-1"].rds.DatabaseName || "";
};
export const getVPCId = (): string => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  return env?.regions["us-east-1"].network.vpcId || "";
};
export const getPublicSubnets = (): string[] => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  const subnets = env?.regions["us-east-1"].network.subnets;
  return subnets?.find((subnet) => subnet.type === "public")?.subnetIds || [];
};
export const getPrivateSubnets = (): string[] => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  const subnets = env?.regions["us-east-1"].network.subnets;
  return subnets?.find((subnet) => subnet.type === "private")?.subnetIds || [];
};
export const getEC2InstanceKeyName = (keyName: string): string => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  return env?.regions["us-east-1"].application.keyPairNames[keyName] || "";
};
export const getAMIId = (imageId: string): string => {
  const env = INFRA_CONFIG.environments.find((env) => env.envName === envName);
  return env?.regions["us-east-1"].application.AMIIds[imageId] || "";
};
export const getSecretsManagerName = (name: string): string =>
  getResourceName(`${name}-secret`);

export const getBucketName = (bucketName: string): string =>
  getResourceName(`${bucketName}-bucket`);

export const getRoleName = (functionName: string): string =>
  getResourceName(`${functionName}-role`);
export const getParameterStoreName = (functionName: string): string =>
  getResourceName(`${functionName}-parameter-store`);
export const getPolicyName = (name: string): string =>
  getResourceName(`${name}-policy`);

export const getLambdaFuncName = (lambdaName: string): string =>
  "${self:custom.stage}-${self:service}-" + lambdaName;
