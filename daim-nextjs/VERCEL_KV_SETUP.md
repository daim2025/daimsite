# Vercel KV Setup Instructions

## 1. Vercelプロジェクトでの設定

### Vercel Dashboardで：
1. プロジェクトに移動
2. "Storage" タブを選択
3. "Connect Database" → "KV (Redis)" を選択
4. データベース名: `daim-kv` 
5. 作成後、環境変数が自動設定される

### 自動設定される環境変数：
```
KV_REST_API_URL
KV_REST_API_TOKEN  
KV_REST_API_READ_ONLY_TOKEN
```

## 2. 追加環境変数の設定

Vercel Dashboard → Settings → Environment Variables で以下を追加：

```
ADMIN_KEY=DAIM_TEST_ADMIN_KEY_2024
```

### メール機能用（オプション）：
```
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
SMTP_FROM=noreply@daim.vercel.app
```

## 3. 初回デプロイ後のデータ移行

初回デプロイ時、既存のJSONファイルからKVストレージに自動移行されます。

### 確認方法：
1. 管理者ページにアクセス
2. 既存の登録者とニュースが表示されることを確認
3. 新規作成・編集が動作することを確認

## 4. 安全性の確保

- 既存のJSONファイルは残りますが、.gitignoreに追加済み
- 本番データは Vercel KV に保存される
- ローカル開発時は自動的にファイル移行される

## 5. メール送信テスト

開発環境では、メールは送信されずコンソールにログ出力されます。
本番環境でSMTP設定をすると実際のメール送信が有効になります。

## トラブルシューティング

### KV接続エラーの場合：
1. 環境変数が正しく設定されているか確認
2. Vercel KVが有効化されているか確認
3. デプロイ後に動作テスト

### データが表示されない場合：
1. 初回アクセス時にJSONからの移行が実行される
2. ブラウザを更新してみる
3. 新規データを作成してテスト