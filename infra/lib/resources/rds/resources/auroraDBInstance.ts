export const AuroraDBInstance: any = {
  Type: 'AWS::RDS::DBInstance',
  Properties: {
    Engine: 'aurora-mysql',
    DBInstanceClass: 'db.serverless',
    DBClusterIdentifier: {
      Ref: 'AuroraDBCluster',
    },
  },
};
