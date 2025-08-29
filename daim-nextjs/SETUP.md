# DAIM メール登録システム セットアップガイド

## 1. 環境変数設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# メール送信設定 (Gmail使用例)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# 管理者設定
ADMIN_EMAIL=admin@daim.site
ADMIN_API_KEY=your_secure_admin_key

# アプリケーションURL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 2. Supabaseセットアップ

### 2.1 Supabaseプロジェクト作成
1. [Supabase](https://supabase.com) でアカウント作成
2. 新しいプロジェクトを作成
3. プロジェクトのURL、anonキー、service_roleキーを取得

### 2.2 データベーステーブル作成
`database/create_subscribers_table.sql` を実行してテーブルを作成：

```sql
-- Supabaseのクエリエディターで実行
```

## 3. メール送信設定

### 3.1 Gmail使用の場合
1. Googleアカウントで2段階認証を有効化
2. [アプリパスワード](https://myaccount.google.com/apppasswords)を生成
3. 生成されたパスワードを `SMTP_PASS` に設定

### 3.2 他のSMTPサービス
- SendGrid
- AWS SES
- Mailgun
等の設定も可能です。

## 4. 機能説明

### 4.1 メール登録
- `/studio` ページでメールアドレス登録
- 自動でウェルカムメール送信
- 重複登録チェック

### 4.2 配信停止
- メール内のリンクから配信停止
- `/unsubscribe?token=xxx` ページで処理

### 4.3 管理者ダッシュボード
- `/admin` ページで登録者管理
- 一括メール送信機能
- 統計情報表示

## 5. API エンドポイント

### 登録
- `POST /api/newsletter`
- Body: `{ "email": "user@example.com" }`

### 配信停止
- `POST /api/unsubscribe`
- Body: `{ "token": "unsubscribe_token" }`

### 管理者機能
- `GET /api/admin/subscribers` - 登録者一覧
- `POST /api/admin/subscribers` - 一括メール送信

## 6. セキュリティ

### 6.1 環境変数の保護
- `.env.local` をgitignoreに追加済み
- 本番環境では環境変数を適切に設定

### 6.2 管理者認証
- `ADMIN_API_KEY` で簡易認証
- より高度な認証が必要な場合は追加実装

## 7. デプロイ

### Vercel デプロイ時
1. 環境変数をVercelダッシュボードで設定
2. Supabaseの設定を確認
3. メール送信テスト実行

## 8. トラブルシューティング

### メールが送信されない場合
1. SMTP設定を確認
2. アプリパスワードが正しいか確認
3. ファイアウォール設定を確認

### データベース接続エラー
1. Supabase URLとキーを確認
2. テーブルが作成されているか確認
3. RLSポリシーが正しく設定されているか確認

## 9. 今後の拡張案

- より高度な認証システム
- メールテンプレートの管理画面
- 配信スケジューリング
- 詳細な分析機能
- A/Bテスト機能
