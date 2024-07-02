import {
  getAMIId,
  getBastionInstanceName,
  getEC2InstanceKeyName,
  getPublicSubnets,
} from '../../../utils/common.util';

export const BastionInstance: any = {
  Type: 'AWS::EC2::Instance',
  Properties: {
    InstanceType: 't2.micro',
    ImageId: getAMIId('AmazonLinux'),
    KeyName: getEC2InstanceKeyName('CommonKeyPair'),
    SecurityGroupIds: [{ Ref: 'BastionSecurityGroup' }],
    SubnetId: getPublicSubnets()[0],
    Tags: [
      {
        Key: 'Name',
        Value: getBastionInstanceName('bastion'),
      },
    ],
  },
};
