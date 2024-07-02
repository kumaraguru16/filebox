import { readFileSync } from "fs";
import { InfraConfig } from "../interfaces/constants.interface";

// Function to load configuration from a JSON file
function loadConfig(): {
  infraConfig: InfraConfig;
} {
  try {
    const configFile = "./infra/config.json";
    // Read configuration from file
    const config: InfraConfig = JSON.parse(readFileSync(configFile).toString());

    // Check if configuration exists
    if (!config)
      throw new Error(
        `Invalid configuration loaded, please verify config file: ${configFile}`
      );

    // Extract environment configurations from loaded config
    const { environments = null } = config;

    // Validate environment configurations
    if (!(environments && environments.length)) {
      throw new Error(
        `No environment found on loaded configuration, please verify config file: ${configFile}`
      );
    }

    // Return loaded configurations and cross-account flag
    return {
      infraConfig: config,
    };
  } catch (err) {
    throw new Error(`Error occurred while loading configuration: ${err}`);
  }
}

// Load configuration and export relevant data
const { infraConfig } = loadConfig();

export const INFRA_CONFIG = infraConfig;
