import { getPrivateSubnets } from '../../../utils/common.util';

export const AuroraDBSubnetGroup: any = {
  Type: 'AWS::RDS::DBSubnetGroup',
  Properties: {
    DBSubnetGroupDescription: 'Subnet group for Aurora Serverless v2',
    SubnetIds: getPrivateSubnets(),
  },
};
