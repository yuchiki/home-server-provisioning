import * as cdk from 'aws-cdk-lib';
import { AmazonLinuxImage, CfnEIPAssociation,  Vpc, Instance, InstanceClass, InstanceSize, InstanceType, SubnetType, UserData, AmazonLinuxGeneration, MachineImage, CfnKeyPair } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { StackConfig } from './stackConfig';
import { CfnEIP} from "aws-cdk-lib/aws-ec2";


// docker が動いている vpn 用のインスタンスを作成
export class VPNStack extends cdk.Stack {
    public readonly vpnInstance: Instance

    constructor(scope: Construct, vpc: Vpc, elasticIP: CfnEIP, idPrefix: string, stackConfig: StackConfig, readonly props?: cdk.StackProps) {
        super(scope, `${idPrefix}-${stackConfig.targetEnvironment}`, props);


        const userData = UserData.forLinux({shebang: '#!/bin/bash -ex'});
        userData.addCommands(
            'dnf install -y docker',
            'systemctl enable --now docker'
        );

        const vpnKeyPair = new CfnKeyPair(this, "KeyPair for VPN",{
            keyName: "VPNKeyPair",
        });
        vpnKeyPair.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

        new cdk.CfnOutput(this, 'GetSSHKeyCommand', {
            value: `aws ssm get-parameter --name /ec2/keypair/${vpnKeyPair.getAtt('KeyPairId')} --region ${this.region} --with-decryption --query Parameter.Value --output text`,
            description: "Get SSH Key Command",});

        this.vpnInstance = new Instance(
            this,
            `vpn`,
            {
                vpc: vpc,
                instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
                machineImage: MachineImage.fromSsmParameter('/aws/service/ami-amazon-linux-latest/al2022-ami-kernel-5.15-x86_64'),
                vpcSubnets:{
                    subnetType: SubnetType.PRIVATE_WITH_EGRESS
                },
                userData:userData,
                ssmSessionPermissions: true,
                keyName: vpnKeyPair.keyName,
            }
        );

        new CfnEIPAssociation(this, "EIP2VPN", {
            eip: elasticIP.ref,
            instanceId: this.vpnInstance.instanceId,
        });
    }
}
