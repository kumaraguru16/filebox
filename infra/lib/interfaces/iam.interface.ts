export interface IAMRole {
  Type: string;
  Properties: {
    Path: string;
    RoleName: string;
    AssumeRolePolicyDocument: {
      Version: string;
      Statement: {
        Effect: string;
        Principal: {
          Service: string[];
        };
        Action: string;
      }[];
    };
    Policies: {
      PolicyName: string;
      PolicyDocument: {
        Version: string;
        Statement: {
          Effect: string;
          Action: string[];
          Resource: string | { [k: string]: string };
        }[];
      };
    }[];
  };
}
