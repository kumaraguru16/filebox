import { getSecurityGroupName, getVPCId } from '../../../utils/common.util';

export const LambdaSecurityGroup: any = {
  Type: 'AWS::EC2::SecurityGroup',
  Properties: {
    GroupDescription: 'Security group for accessing the Aurora RDS',
    VpcId: getVPCId(),
    Tags: [
      {
        Key: 'Name',
        Value: getSecurityGroupName('lambda-aurora'),
      },
    ],
  },
};
