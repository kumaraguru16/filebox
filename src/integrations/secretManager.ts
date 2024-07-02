const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');
import { AWS_REGION } from '../constants/application.constant';
import { BusinessException } from '../exceptions/business-exception';
import { logger } from '../utils/logger.utils';

export class SecretManagerIntegration {
  static async getDatabaseSecret(): Promise<{ [k: string]: string }> {
    logger.trace(`Entered <SecretManagerIntegration.getDatabaseSecret>}`);
    const client = new SecretsManagerClient({ region: AWS_REGION });
    const command = new GetSecretValueCommand({
      SecretId: process.env.RDS_SECRET_NAME,
    });
    try {
      const response = await client.send(command);
      logger.trace(`Exited <SecretManagerIntegration.getDatabaseSecret>}`);
      return JSON.parse(response.SecretString);
    } catch (error) {
      logger.error(
        'Error in <SecretManagerIntegration.getDatabaseSecret>, error: %o',
        error
      );
      throw new BusinessException(
        `Unable to get secrets from secretManager: ${error}`
      );
    }
  }
}
