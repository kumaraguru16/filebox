import { DBSubnetGroupResource } from '../../../interfaces/rds.interface';
import {
  getDBSubnetGroupName,
  getPrivateSubnets,
} from '../../../utils/common.util';

export const DBSubnetGroup: DBSubnetGroupResource = {
  Type: 'AWS::RDS::DBSubnetGroup',
  Properties: {
    DBSubnetGroupName: getDBSubnetGroupName('Aurora'),
    DBSubnetGroupDescription: 'Subnets for the Aurora DB',
    SubnetIds: getPrivateSubnets(),
  },
};
