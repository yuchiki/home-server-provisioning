# 概要

自宅鯖設定のためのリポジトリ

# 注意

1. 一番最初に `make set-githook` を実行してください。秘匿情報を平文のまま commit したり push したりするのを防ぐためのスクリプトです。
2. secrets.yaml を変更するために平文化した後は、必ずコミット・push する前に暗号化してください。（githooks で平文のままのコミットを防ぐ仕組みは存在しています）

# 開発

vault-password.txt に vault key を設置します。
この key によって、 secrets.yaml の秘匿情報を閲覧、平文化、暗号化することができます。
vault key は growi に記載されています

# 前提条件

- secrets.yaml に記載の通りの、ssh 権限を持った非 root ユーザーが作成されていることが必要です。
- ゆーちき AWS 環境にアクセスできる状態に local の AWSCLI 設定がなされている必要があります。

# 使用方法

`make provision` をした後、ユーザーが作成されます。
初期パスワードは ansible/vars/secrets.yaml の中です。
自分の好きなパスワードに変えてください。

# 秘匿情報の編集

`ansible-vault edit` コマンドを用いてください。

# ロードマップ

[roadmap](docs/roadmap.md)

# ansible にまだ組み込めてないこと

- k3s の入れ方
  - `curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server --disable=traefik" sh`
  - この構成だと istio を使っているので traefik 抜きである必要がある
- argoCD の導入
- [internal-proxy](./internal-proxy/)の導入
  - これで`sudo docker-compose up -d` すればいいはず
  - 現在は`~/dns` で dns という名前で動いているので、それを一回消してから
