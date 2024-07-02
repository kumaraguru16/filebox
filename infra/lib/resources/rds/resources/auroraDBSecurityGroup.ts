import { getSecurityGroupName, getVPCId } from '../../../utils/common.util';

export const AuroraDBSecurityGroup: any = {
  Type: 'AWS::EC2::SecurityGroup',
  Properties: {
    GroupDescription: 'Security group for Aurora Serverless v2 cluster',
    VpcId: getVPCId(),
    SecurityGroupIngress: [
      {
        IpProtocol: 'tcp',
        FromPort: 3306,
        ToPort: 3306,
        SourceSecurityGroupId: {
          Ref: 'BastionSecurityGroup',
        },
      },
      {
        IpProtocol: 'tcp',
        FromPort: 3306,
        ToPort: 3306,
        SourceSecurityGroupId: {
          Ref: 'LambdaSecurityGroup',
        },
      },
    ],
    Tags: [
      {
        Key: 'Name',
        Value: getSecurityGroupName('aurora'),
      },
    ],
  },
};
