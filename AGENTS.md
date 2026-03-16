# Codex Project Memory

## 技術スタック

- 開発環境: devcontainer
- アプリ種別: React Native モバイルアプリ
- フレームワーク: Expo managed workflow
- 実装言語: JavaScript (ES2022)
- パッケージマネージャー: npm
- 起動コマンド: `expo start`

## 目的

このリポジトリは、React Native + Expo + JavaScript でメモリーゲームアプリをスペック駆動開発するためのプロジェクトです。

## 基本フロー

1. `docs/` の永続ドキュメントと対象 `.steering/...` を確認する
2. 対応する `.steering/...` がなければ新しい作業単位を作成する
3. 要求整理、影響範囲確認、実装計画は `plan-feature` を起点に進める
4. 実装、テスト、関連ドキュメント更新は `implement-feature` を起点に進める
5. 実装完了後は `implementation-validator` の観点で厳しめに検証する
6. React Native / Expo アプリの起動確認は `expo start` で行う
7. `tasklist.md` に沿って進捗、検証結果、残課題を更新する
8. 仕様変更が確定したら `docs/` の永続ドキュメントを更新する

## Codex運用ルール

- 大きい調査・設計・レビュー・検証は、利用可能ならサブエージェント/背景実行へ委任する
- サブエージェント利用の有無はユーザー指示を優先する
- 実行環境にサブエージェント機能がない場合は、その制約を明示した上で通常実行へフォールバックする
- 進捗管理は Plan モードと `tasklist.md` の両方で行う
- スキルは `.agents/skills/` の `SKILL.md` を優先参照する
- 指示は通常チャットで実行可能（slash前提にしない）
- Feature 開発フローは `plan-feature` → `implement-feature` → `implementation-validator` を基本とする
- 実装・レビュー・調査を始める前に、対象作業の `.steering/[YYYYMMDD]-[task]/` を必ず確認する
- 対応する `.steering/...` が存在しない場合は、新しい作業単位を作成してから進める
- タスクを1つ完了するたびに `tasklist.md` を更新する
- 要件や設計の判断が変わった場合は、同じ `.steering/...` の `requirements.md` と `design.md` も必要に応じて更新する
- `.steering/...` は短期の構造化メモとして扱い、`docs/` は確定した永続ドキュメントとして扱う
- docs と agent 定義は React Native + Expo managed workflow + JavaScript を正式前提とする
- モバイル起動確認が必要な変更では `expo start` を基準コマンドとして扱う
- `docs/` の6ファイルが揃っていない場合は、実装より先に `docs/ideas/initial-requirements.md` を読み、以下を必ず作成する
  - `docs/product-requirements.md`
  - `docs/functional-design.md`
  - `docs/architecture.md`
  - `docs/repository-structure.md`
  - `docs/development-guidelines.md`
  - `docs/glossary.md`

## ディレクトリ

### 初期入力

- `docs/ideas/initial-requirements.md`

### 永続ドキュメント

- `docs/product-requirements.md`
- `docs/functional-design.md`
- `docs/architecture.md`
- `docs/repository-structure.md`
- `docs/development-guidelines.md`
- `docs/glossary.md`

### 作業単位ドキュメント

- `.steering/[YYYYMMDD]-[task]/requirements.md`
- `.steering/[YYYYMMDD]-[task]/design.md`
- `.steering/[YYYYMMDD]-[task]/tasklist.md`

### Codex補助ディレクトリ

- `.agents/skills/`: 専門スキル
- `.agents/commands/`: 定型ワークフロー
- `.agents/agents/`: レビュー用ペルソナ定義
- `.agents/workspaces/`: 一時的なタスク進捗メモ

## よく使う依頼例

- 「setup-projectを実行して docs を初期作成して」
- 「plan-feature: スコア表示を追加して」
- 「implement-feature: スコア表示を追加して」
- 「implementation-validator で実装をレビューして」
- 「docs/product-requirements.md をレビューして」
