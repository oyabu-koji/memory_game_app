# codex-project-template

Codex向けの未着手プロジェクトテンプレートです。

このテンプレートは、以下の状態から新規開発を始めることを想定しています。

- `docs/ideas/initial-requirements.md` はある
- `docs/` の永続ドキュメント6点はまだない
- `.steering/` には作業計画がまだない
- `src/` には最小の動作確認用サンプルだけがある

## 目的

- スペック駆動開発を Codex で始めやすくする
- `docs/` と `.steering/` を分けて運用する
- 新しいプロジェクトごとにこのディレクトリを GitHub から clone して使えるようにする

## 使い方

1. このテンプレートを clone する
2. 必要ならリポジトリ名と `package.json` の `name` を変更する
3. `nvm use`
4. `npm ci`
5. `AGENTS.md` を読む
6. `setup-project` を実行して `docs/` の6文書を作る
7. `add-feature` で最初の機能を着手する

## ローカル環境セットアップ

### 前提

- Node.js 22.x
- npm 10.x

### 初回セットアップ

```bash
nvm use
npm ci
```

### 動作確認

```bash
npm run typecheck
npm run lint
npm test
```

## 初期状態で入っているもの

- `AGENTS.md`: Codex運用ルール
- `.agents/`: skills / commands / review agents
- `docs/ideas/initial-requirements.md`: 要求整理の出発点
- `.steering/.gitkeep`: 作業計画用ディレクトリ
- `src/`: ツールチェーン確認用の最小サンプル

## 補足

- このテンプレートは「未着手状態」を維持するため、`docs/` の正式文書や実装済み `src/` は含めません
- Claude系ツールとの併用向けに `CLAUDE.md` も置いていますが、Codex運用の正本は `AGENTS.md` です
