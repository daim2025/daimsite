# EmailJS セットアップ手順

## 1. EmailJSアカウント作成

1. [EmailJS](https://www.emailjs.com/) にアクセス
2. 「Sign Up」で無料アカウント作成
3. メール認証を完了

## 2. メールサービス設定

1. ダッシュボードで「Email Services」をクリック
2. 「Add New Service」を選択
3. Gmail、Outlook、Yahoo等のサービスを選択
4. 認証情報を入力（送信者メールアドレス）
5. Service IDをメモ

## 3. メールテンプレート作成

1. 「Email Templates」をクリック
2. 「Create New Template」を選択
3. 以下の内容でテンプレートを作成：

### テンプレート設定:
```
To Email: info@discoverfeed.net
CC: koba@discoverfeed.net
Subject: 【DAIM】新しいお問い合わせ - {{subject}}

本文:
新しいお問い合わせが届きました。

■ お問い合わせ内容
- お名前: {{from_name}}
- メールアドレス: {{from_email}}
- 件名: {{subject}}
- 送信日時: {{sent_at}}

■ メッセージ内容:
{{message}}

---
返信先: {{reply_to}}
このメールはDAIMお問い合わせフォームから自動送信されました。
```

4. Template IDをメモ

## 4. Public Key取得

1. ダッシュボードで「Account」→「General」
2. 「Public Key」をコピー

## 5. 環境変数設定

`.env.local`ファイルに以下を追加：

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 6. テスト

設定完了後、お問い合わせフォームからテスト送信を実行してください。

## 無料プラン制限

- 月200通まで送信可能
- 1日50通まで
- EmailJSブランディング付き

## トラブルシューティング

### よくあるエラー:
1. **Service ID not found**: サービス設定を確認
2. **Template ID not found**: テンプレート設定を確認
3. **Authentication failed**: メールサービスの認証情報を確認
4. **Rate limit exceeded**: 送信頻度制限に引っかかっています

### デバッグ:
ブラウザの開発者ツールのコンソールでエラー詳細を確認できます。