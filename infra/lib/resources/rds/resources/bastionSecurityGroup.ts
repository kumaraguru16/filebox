import { getSecurityGroupName, getVPCId } from '../../../utils/common.util';

export const BastionSecurityGroup: any = {
  Type: 'AWS::EC2::SecurityGroup',
  Properties: {
    GroupDescription: 'Security group for the bastion host',
    VpcId: getVPCId(),
    SecurityGroupIngress: [
      {
        IpProtocol: 'tcp',
        FromPort: 22,
        ToPort: 22,
        CidrIp: '0.0.0.0/0',
      },
    ],
    Tags: [
      {
        Key: 'Name',
        Value: getSecurityGroupName('bastion'),
      },
    ],
  },
};
