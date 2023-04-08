#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { getStackConfig } from '../lib/stackConfig';
import { VPCStack } from '../lib/vpcStack';

const app = new cdk.App();
const stackConfig = getStackConfig(key =>  app.node.tryGetContext(key));
new VPCStack(app, "yuchiki-vpc-stack", stackConfig);

// TODO: vpnStackを追加する
