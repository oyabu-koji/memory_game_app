---
description: 新機能を既存パターンに従って実装し、検証まで完了する
---

# add-feature

引数: 機能名（例: `add-feature ユーザープロフィール編集`）

## 手順

1. コンテキスト準備
   - `docs/` の6つの永続ドキュメントが存在するか確認
   - 不足している場合は `setup-project` 相当の流れで `docs/ideas/initial-requirements.md` から先に補完
   - 対象機能名を確定
   - `.steering/[YYYYMMDD]-[機能名]/` を作成
   - `requirements.md`, `design.md`, `tasklist.md` を用意

2. 既存仕様の把握
   - `AGENTS.md` と `docs/` を読む
   - `src/` を検索して既存パターンを把握

3. 計画作成
   - `$steering` を使って3ファイルを具体化
   - タスクは小さく分割し、順序を明確化

4. 実装ループ
   - `tasklist.md` の未完了タスクを1件ずつ実装
   - 実施ごとに `tasklist.md` を更新
   - 要件や設計判断が変わったら `requirements.md` / `design.md` も更新
   - 必要なら Plan モードの進捗も更新

5. 品質確認
   - 利用可能なら背景実行でレビューや検証を委任
   - `npm test`
   - `npm run lint`
   - `npm run typecheck`

6. 振り返り
   - `tasklist.md` の振り返り欄に記録
   - 仕様影響がある場合は `docs/` も更新

## 完了条件

- `tasklist.md` のタスクが完了している
- test/lint/typecheck が通っている
- 変更内容と残課題が記録されている
