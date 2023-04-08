set-githook: # git hook を設定するためのコマンドです。
	git config core.hooksPath .githooks


# secretsの中身を見る
view-secrets:
	ansible-vault view  ansible/vars/secrets.yaml

# inventoryの中身を見る
view-inventory:
	ansible-vault view ansible/inventory.yaml

# secretsとinventoryを再度暗号化する
encrypt:
	ansible-vault encrypt ansible/vars/secrets.yaml ansible/inventory.yaml ansible/.ssh/id_rsa

# provisioning をする
provision:
	ansible-playbook -i ansible/inventory.yaml ansible/setup-ssh.yaml
	ansible-playbook -i anisble/inventory.yaml ansible/start-ansible-cluster.yaml

# AWS dev 環境を構築する
cdk-deploy-dev:
	$(MAKE) -C CDK  deploy-dev

# AWS dev環境を破壊する
cdk-destroy-dev:
	$(MAKE) -C CDK destroy-dev

# CDK が正しくcloudformation を生成できるか確かめる
cdk-synth:
	$(MAKE) -C CDK synth

# CDK を diff に適用するとどういうdiffが発生するか確かめる
cdk-diff-dev:
	$(MAKE) -C CDK diff-dev

# CDK を prod に適用するとどういうdiffが発生するか確かめる
cdk-diff-prod:
	$(MAKE) -C CDK diff-prod
