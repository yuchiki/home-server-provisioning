#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { getStackConfig } from "../lib/stackConfig";
import { VPCStack } from "../lib/vpcStack";
import { VPNStack } from "../lib/vpnStack";

const app = new cdk.App();
const stackConfig = getStackConfig((key) => app.node.tryGetContext(key));

const vpcStack = new VPCStack(app, "yuchiki-vpc-stack", stackConfig);

const vpnStack = new VPNStack(
  app,
  vpcStack.vpc,
  vpcStack.vpnElasticIP,
  "yuchiki-vpn-stack",
  stackConfig
);

// declare dependencies explicitely
vpnStack.addDependency(vpcStack);
