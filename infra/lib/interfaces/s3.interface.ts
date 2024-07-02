type S3_VERSION_CONFIGURATION = 'Enabled' | 'Suspended';
export interface S3 {
  Type: string;
  Properties: {
    BucketName: string;
    VersioningConfiguration: {
      Status: S3_VERSION_CONFIGURATION;
    };
    CorsConfiguration: {
      CorsRules: {
        AllowedHeaders: string[];
        AllowedMethods: string[];
        AllowedOrigins: string[];
        ExposeHeaders?: string[];
        MaxAge: number;
      }[];
    };
  };
}
