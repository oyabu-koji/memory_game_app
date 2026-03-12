# Codex Project Memory

## 技術スタック

- 開発環境: devcontainer
- Node.js: LTS
- TypeScript: 5.x
- パッケージマネージャー: npm

## 目的

このリポジトリは、Codexでスペック駆動開発を始めるための未着手テンプレートです。

## 基本フロー

1. `docs/ideas/` から要求の種を整理する
2. `docs/` の永続ドキュメント6点の有無を確認する
3. 不足があれば `docs/ideas/initial-requirements.md` を起点に `docs/` を先に初期化する
4. `.steering/` に作業単位の計画を作成、または既存タスクを特定する
5. 実装・レビュー・調査の前に対象 `.steering/...` を参照する
6. `tasklist.md` に沿って実装・検証する
7. タスク完了ごとに `.steering/...` を更新する
8. 必要なら永続ドキュメントを更新する

## Codex運用ルール

- 大きい調査・設計・レビュー・検証は、利用可能ならサブエージェント/背景実行へ委任する
- サブエージェント利用の有無はユーザー指示を優先する
- 実行環境にサブエージェント機能がない場合は、その制約を明示した上で通常実行へフォールバックする
- 進捗管理は Plan モードと `tasklist.md` の両方で行う
- スキルは `.agents/skills/` の `SKILL.md` を優先参照する
- 指示は通常チャットで実行可能（slash前提にしない）
- 実装・レビュー・調査を始める前に、対象作業の `.steering/[YYYYMMDD]-[task]/` を必ず確認する
- 対応する `.steering/...` が存在しない場合は、新しい作業単位を作成してから進める
- タスクを1つ完了するたびに `tasklist.md` を更新する
- 要件や設計の判断が変わった場合は、同じ `.steering/...` の `requirements.md` と `design.md` も必要に応じて更新する
- `.steering/...` は短期の構造化メモとして扱い、`docs/` は確定した永続ドキュメントとして扱う
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
- 「add-feature: ユーザー招待機能」
- 「docs/product-requirements.md をレビューして」
