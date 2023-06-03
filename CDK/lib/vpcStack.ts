import * as cdk from "aws-cdk-lib";
import { CfnEIP, CfnKeyPair, IpAddresses, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { StackConfig } from "./stackConfig";
import { vpcCidr } from "./vpcCidr";

export class VPCStack extends cdk.Stack {
  public readonly vpc: Vpc;
  public readonly vpnElasticIP: CfnEIP;

  constructor(
    scope: Construct,
    idPrefix: string,
    stackConfig: StackConfig,
    readonly props?: cdk.StackProps
  ) {
    super(scope, `${idPrefix}-${stackConfig.targetEnvironment}`, props);

    this.vpc = new Vpc(this, `vpc`, {
      ipAddresses: IpAddresses.cidr(vpcCidr[stackConfig.targetEnvironment]),
      maxAzs: 2,
    });

    this.vpnElasticIP = new CfnEIP(this, "Elastic IP for VPN", {
      tags: [
        {
          key: "Name",
          value: "VPNEIP",
        },
        {
          key: "Environment",
          value: stackConfig.targetEnvironment,
        },
        {
          key: "Project",
          value: "VPN",
        },
      ],
    });

    new cdk.CfnOutput(this, "vpnElasticIP", { value: this.vpnElasticIP.ref });
  }
}
