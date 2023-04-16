import * as cdk from 'aws-cdk-lib';
import { AmazonLinuxImage, CfnEIPAssociation, CfnTransitGatewayMulticastDomainAssociationProps, IVpc, Instance, InstanceClass, InstanceSize, InstanceType, SubnetType, UserData } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { StackConfig } from './stackConfig';
import { CfnEIP} from "aws-cdk-lib/aws-ec2";


// docker が動いている vpn 用のインスタンスを作成
export class VPNStack extends cdk.Stack {
    public readonly vpnInstance: Instance

    constructor(scope: Construct, vpc: IVpc, elasticIP: CfnEIP, idPrefix: string, stackConfig: StackConfig, readonly props?: cdk.StackProps) {
        super(scope, `${idPrefix}-${stackConfig.targetEnvironment}`, props);


        const userData = UserData.forLinux({shebang: '#!/bin/bash -ex'});
        userData.addCommands(
            'dnf install -y docker',
            'systemctl enable --now docker'
        );

        this.vpnInstance = new Instance(
            this,
            `vpc`,
            {
                vpc: vpc,
                instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
                machineImage: new AmazonLinuxImage(),
                vpcSubnets:{
                    subnetType: SubnetType.PRIVATE_WITH_EGRESS
                },
                userData:userData,
            }
        );

        new CfnEIPAssociation(this, "EIP2VPN", {
            eip: elasticIP.ref,
            instanceId: this.vpnInstance.instanceId,
        });

    }
}
