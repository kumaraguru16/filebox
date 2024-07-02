export interface AppSubnetConfig {
  type: string; // Type of subnet (e.g., public, private)
  name?: string;
}

export interface ToolsSubnetLookupConfig extends AppSubnetConfig {
  subnetIds: Array<string>;
  routeTableIds?: Array<string>;
}

export interface InfraNetworkConfig {
  vpcId: string;
  igwId?: string;
  subnets: Array<ToolsSubnetLookupConfig>;
}

// Application config
export interface ApplicationConfig {
  idpName: string;
  idpMetadataUrl: string;
  AMIIds: { [k: string]: string };
  keyPairNames: { [k: string]: string };
}

export interface RDSConfig {
  DatabaseName: string;
  MinCapacity: number;
  MaxCapacity: number;
}

// Configuration for a specific region within an environment
export interface ApplicationRegionConfig {
  network: InfraNetworkConfig;
  application: ApplicationConfig;
  rds: RDSConfig;
}

// Configuration for an environment (e.g., dev, stage, prod)
export interface InfraEnvironmentConfig {
  envName: string;
  account: string;
  needApproval: string;
  tags: { [k: string]: string };
  regions: {
    "us-east-1": ApplicationRegionConfig;
    "us-east-2": ApplicationRegionConfig;
    "us-west-1": ApplicationRegionConfig;
  };
}

// Overall config
export interface InfraConfig {
  applicationName: string;
  stackPrefix: string;
  environments: Array<InfraEnvironmentConfig>;
}
