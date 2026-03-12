# 開発ガイドライン (Development Guidelines)

## 基本原則

### 1. 子供向け体験を最優先にする

- 5歳前後の子供が迷わず触れることを最優先に判断する
- テキスト説明より、配置・色・アニメーション・音で理解させる
- ミスを責める演出は避け、再挑戦しやすい体験にする

### 2. オフライン前提を崩さない

- MVPでは外部APIやクラウド依存を導入しない
- アセットはすべてアプリ同梱を前提にする
- ネットワーク未接続でも起動からクリアまで完結できることを保つ

### 3. ドキュメントと実装を同期する

- 新規作業は `.steering/[YYYYMMDD]-[task]/` を作成してから着手する
- 例外は初回 `setup-project` のみで、恒久ドキュメント作成を先に完了する
- 実装中に仕様判断が変わったら `docs/` と `.steering/` の両方を更新する

## 開発環境

- Node.js: 22.x
- npm: 10.x
- JavaScript: ES2022
- 開発コンテナ: `.devcontainer/devcontainer.json`

### 初回セットアップ

```bash
nvm use
npm ci
```

### 日常的な確認コマンド

```bash
npm run lint
npm test
```

注記:
- 現在のリポジトリはテンプレート状態なので、Expo導入後にモバイル実行用スクリプトを追加する
- 現在のテンプレートには TypeScript 向け設定や `npm run typecheck` が残っているため、JavaScript 実装へ入る前に別タスクで整理する
- `lint` と `test` は、JavaScript 方針へ移行後も継続して維持する

## コーディング規約

### JavaScript方針

- 新規コードは JavaScript で実装する
- ゲーム状態、カード構造、状態遷移の期待値は JSDoc、設計文書、テストで明示する
- 公開される関数、hook、service の入出力は命名とサンプルオブジェクトで読み取れるようにする
- 型コンパイラに依存しない前提で、lint とテストを強めに維持する

### 命名規則

```javascript
// 変数・関数: camelCase
const selectedCardIds = [];
function createDeck() {
  return [];
}

// コンポーネント: PascalCase
function MemoryCard() {
  return <View />;
}

// Hook: use で始める
function useGameSession() {
  return {};
}

// Boolean: is / has / can / should
const isMatched = false;
const canSelectCard = true;
```

### ファイル規約

- 画面: `PascalCase + Screen.jsx`
- コンポーネント: `PascalCase.jsx`
- Hook / service / util: `camelCase.js`
- データ定義補助: `*.types.js`
- テスト: `*.test.js` または `*.test.jsx`

### 状態管理のルール

- ゲーム状態の一次ソースは `useGameSession` に集約する
- `matchedPairs` のような状態は、必要なら selector で導出し、重複状態を増やしすぎない
- `gameStatus = 'resolving'` の間は入力受付を止め、レースコンディションを防ぐ

### 端末APIの扱い

- 音、振動、将来のローカル保存は `services/` に隔離する
- 画面コンポーネントからExpo APIを直接呼ばない
- 音や振動が利用不可でもゲームは続行可能であること

### コメント規約

- コメントは「なぜその実装が必要か」を補う時だけ書く
- 子供向けUIの配慮や、端末差異回避の理由は短く残す
- コードから明らかな処理説明コメントは書かない

## UI / UX 実装ルール

- 主要なタップ対象は十分な余白と大きさを確保する
- 情報は1画面に詰め込みすぎず、子供が注目すべき要素を明確にする
- 状態表現は色だけに頼らず、動きや形も併用する
- 失敗時の音量、振動、色は弱めにし、成功時の達成感を目立たせる
- 長文説明、複雑な設定、確認ダイアログはMVPでは避ける

## テスト戦略

### 優先順位

1. 純粋なゲームロジックの単体テスト
2. 画面とhookをまたぐ状態遷移テスト
3. 実機での音・振動・アニメーション確認

### ユニットテスト

- `createDeck`: 20枚生成、10ペア、重複なし、シャッフル結果の妥当性
- `resolveTurn`: 一致、不一致、無効入力、クリア判定
- selector / utility: 派生値の整合性

### UI・統合テスト

- ホーム画面からゲーム開始できる
- 2枚めくった後に追加タップがロックされる
- マッチ時にカードが固定される
- ミスマッチ時にカードが戻る
- 全ペア一致でクリア演出が出る

### 実機確認

- 機内モードで起動からクリアまで遊べる
- 音あり / 音なし端末設定の両方でゲームが成立する
- 振動対応端末 / 非対応端末の両方でクラッシュしない

## 品質ゲート

変更を完了とする前に、少なくとも以下を満たす:

- `npm run lint` が通る
- `npm test` が通る
- 追加した仕様に対応する `docs/` または `.steering/` 更新がある

モバイル実装着手後は、必要に応じて以下も追加する:
- 実機またはシミュレータでの起動確認
- オフライン動作確認
- 主要アニメーションの目視確認

## Git運用ルール

### ブランチ戦略

- `main`: 安定状態
- `develop`: 統合作業用
- `feature/<task>`: 機能追加
- `fix/<task>`: 修正
- `docs/<task>`: ドキュメント整備

### コミットメッセージ

Conventional Commitsを使う。

```text
feat(game): add deck generation logic
fix(feedback): guard against unavailable haptics
docs(prd): define offline MVP scope
```

### プルリクエスト前チェック

- 変更理由を1段落で説明できる
- 受け入れ条件に対応する確認結果がある
- 影響したドキュメントが更新されている
- 追加ライブラリがある場合、導入理由が説明されている

## 依存関係の追加ルール

- React Native / Expo標準で足りる場合は新規依存を追加しない
- 端末API系ライブラリはExpo公式対応を優先する
- 追加パッケージは「何を減らすか」「なぜ標準機能で足りないか」を `.steering/` に残す

## アセット管理ルール

- 画像・音声は用途別に `assets/` 配下へ分ける
- 同梱アセットはライセンス確認を行い、必要なら出典を記録する
- 大きすぎるアセットは圧縮し、起動性能を悪化させない

## Definition of Done

- 受け入れ条件を満たしている
- テストと静的解析が通っている
- 実機確認が必要な変更は確認結果が残っている
- 関連ドキュメントが更新されている
- 子供向けUXを損なう後退がない
