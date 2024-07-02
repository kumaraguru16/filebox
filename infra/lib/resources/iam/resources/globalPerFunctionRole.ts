import { IAMRole } from "../../../interfaces/iam.interface";
import { getPolicyName, getRoleName } from "../../../utils/common.util";

export const GlobalLambdaFunctionRole: IAMRole = {
  Type: "AWS::IAM::Role",
  Properties: {
    Path: "/",
    RoleName: getRoleName("global-lambda"),
    AssumeRolePolicyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Service: ["lambda.amazonaws.com", "sns.amazonaws.com"],
          },
          Action: "sts:AssumeRole",
        },
      ],
    },
    Policies: [
      {
        PolicyName: getPolicyName("sls"),
        PolicyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: [
                "cloudwatch:*",
                "ec2:*",
                "s3:*",
                "lambda:*",
                "sts:AssumeRole",
                "iam:*",
                "events:*",
                "sns:*",
                "ses:*",
                "logs:*",
                "sqs:*",
                "mobiletargeting:*",
                "xray:*",
                "cloudfront:*",
                "execute-api:*",
                "secretsmanager:*",
                "cloudformation:*",
                "kms:*",
              ],
              Resource: "*",
            },
          ],
        },
      },
    ],
  },
};
