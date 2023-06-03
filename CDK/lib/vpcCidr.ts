import { TargetEnvironment } from "./targetEnvironment";

export const vpcCidr: { [P in TargetEnvironment]: string } = {
  production: "10.0.0.0/16",
  staging: "10.1.0.0/16",
  development: "10.2.0.0/16",
};
