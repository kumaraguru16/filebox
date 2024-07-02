import { SecretManagerIntegration } from '../integrations/secretManager';

export const getDatabaseURL = async (): Promise<string> => {
  const secretData = await SecretManagerIntegration.getDatabaseSecret();
  const databaseURL = `mysql://${secretData.username}:${secretData.password}@${secretData.hostname}/${secretData.database}`;
  return databaseURL;
};
