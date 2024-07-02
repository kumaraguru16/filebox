import { AuroraDBClusterResource } from '../../../interfaces/rds.interface';
import {
  getClusterMaxCapacity,
  getClusterMinCapacity,
  getDBIdentifierName,
  getSecretsManagerName,
} from '../../../utils/common.util';

export const AuroraDBCluster: AuroraDBClusterResource = {
  Type: 'AWS::RDS::DBCluster',
  Properties: {
    Engine: 'aurora-mysql',
    EngineVersion: '8.0.mysql_aurora.3.06.0',
    DBClusterIdentifier: getDBIdentifierName('rds-cluster'),
    DatabaseName: {
      'Fn::Sub': `{{resolve:secretsmanager:${getSecretsManagerName('rds-aurora')}::database}}`,
    },
    ServerlessV2ScalingConfiguration: {
      MinCapacity: getClusterMinCapacity(),
      MaxCapacity: getClusterMaxCapacity(),
    },
    DBSubnetGroupName: {
      Ref: 'AuroraDBSubnetGroup',
    },
    VpcSecurityGroupIds: [
      {
        'Fn::GetAtt': ['AuroraDBSecurityGroup', 'GroupId'],
      },
    ],
    MasterUsername: {
      'Fn::Sub': `{{resolve:secretsmanager:${getSecretsManagerName('rds-aurora')}::username}}`,
    },
    MasterUserPassword: {
      'Fn::Sub': `{{resolve:secretsmanager:${getSecretsManagerName('rds-aurora')}::password}}`,
    },
  },
};
