import { DBSecretsManagerResource } from '../../../interfaces/rds.interface';
import {
  getDatabaseName,
  getSecretsManagerName,
} from '../../../utils/common.util';

export const DBSecretsManager: DBSecretsManagerResource = {
  Type: 'AWS::SecretsManager::Secret',
  Properties: {
    Name: getSecretsManagerName('rds-aurora'),
    GenerateSecretString: {
      SecretStringTemplate: `{"username": "admin", "database": "${getDatabaseName()}", "hostname": "replace with rds hostname" }`,
      GenerateStringKey: 'password',
      PasswordLength: 20,
      ExcludePunctuation: true,
    },
  },
};
