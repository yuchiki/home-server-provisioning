.PHONY: deploy destroy synth


deploy-dev:
	cdk deploy --outputs-file ./cdk-outputs.json --all

destroy-dev:
	cdk destroy --all

synth:
	cdk synth

diff-dev:
	cdk diff

diff-prod:
	cdk diff --context targetEnvironment=production
