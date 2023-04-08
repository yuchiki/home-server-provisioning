import * as cdk from 'aws-cdk-lib';
import { IpAddresses, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { StackConfig } from './stackConfig';
import { vpcCidr } from './vpcCidr';

export class VPCStack extends cdk.Stack {
    public readonly vpc: Vpc

    constructor(scope: Construct, idPrefix: string, stackConfig: StackConfig, readonly props?: cdk.StackProps) {
        super(scope, `${idPrefix}-${stackConfig.targetEnvironment}`, props);

        this.vpc = new Vpc(
            this,
            `vpc`,
            {
                ipAddresses: IpAddresses.cidr(vpcCidr[stackConfig.targetEnvironment]),
                maxAzs: 2,
            }
        );

    }
}
