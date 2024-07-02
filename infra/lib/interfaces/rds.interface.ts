export interface AuroraDBClusterResource {
  Type: 'AWS::RDS::DBCluster';
  Properties: {
    Engine: string;
    EngineVersion: string;
    DBClusterIdentifier: string;
    DatabaseName: { [k: string]: string };
    ServerlessV2ScalingConfiguration: {
      MinCapacity: number;
      MaxCapacity: number;
    };
    DBSubnetGroupName: { Ref: string };
    VpcSecurityGroupIds: {
      'Fn::GetAtt': string[];
    }[];
    MasterUsername: { 'Fn::Sub': string };
    MasterUserPassword: { 'Fn::Sub': string };
  };
}

export interface DBSubnetGroupResource {
  Type: 'AWS::RDS::DBSubnetGroup';
  Properties: {
    DBSubnetGroupName: string;
    DBSubnetGroupDescription: string;
    SubnetIds: string[];
  };
}

export interface DBSecretsManagerResource {
  Type: 'AWS::SecretsManager::Secret';
  Properties: {
    Name: string;
    Description?: string;
    GenerateSecretString: {
      SecretStringTemplate: string;
      GenerateStringKey: string;
      PasswordLength: number;
      ExcludePunctuation: boolean;
    };
  };
}
