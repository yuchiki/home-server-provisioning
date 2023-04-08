# 概要
自宅鯖設定のためのリポジトリ

# 注意

1. 一番最初に `make set-githook` を実行してください。秘匿情報を平文のままcommit したり pushしたりするのを防ぐためのスクリプトです。
2. secrets.yamlを変更するために平文化した後は、必ずコミット・pushする前に暗号化してください。（githooksで平文のままのコミットを防ぐ仕組みは存在しています）

# 開発

vault-password.txt に vault keyを設置します。
このkeyによって、 secrets.yamlの秘匿情報を閲覧、平文化、暗号化することができます。
vault key は growi に記載されています

# 前提条件

-  secrets.yamlに記載の通りの、ssh 権限を持った非rootユーザーが作成されていることが必要です。

# 使用方法

`make provision` をした後、ユーザーが作成されます。
初期パスワードは ansible/vars/secrets.yamlの中です。
自分の好きなパスワードに変えてください。

# 秘匿情報の編集

`ansible-vault edit` コマンドを用いてください。


# ロードマップ

[roadmap](docs/roadmap.md)
