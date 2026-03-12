# リポジトリ構造定義書 (Repository Structure Document)

## 適用方針

このリポジトリは現在テンプレート段階にあり、`src/example.ts` などの最小サンプルが残っている。  
実装開始時は、既存の品質設定を見直しつつ、JavaScript ベースの以下のターゲット構造へ段階的に移行する。

### 現状との差分

- 現在の root には `tsconfig.json`、`vitest.config.ts`、`src/example.ts`、`src/example.test.ts` が残っている
- 以下の構造は JavaScript 実装へ移るためのターゲット状態であり、最初の基盤整理タスクで差分を解消する
- `tests/e2e/` は将来の自動シナリオテスト用の予約領域とし、MVP時点の実機確認結果は `.steering/[YYYYMMDD]-[task]/tasklist.md` に記録する

## プロジェクト構造

```text
project-root/
├── App.jsx                       # Expoエントリーポイント
├── assets/                       # 画像・音声などの同梱アセット
│   ├── audio/
│   ├── cards/
│   └── icons/
├── src/
│   ├── app/                      # アプリ共通設定、テーマ、Provider
│   │   ├── providers/
│   │   ├── theme/
│   │   └── navigation/
│   ├── features/
│   │   └── memory-game/          # 神経衰弱機能本体
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── logic/
│   │       ├── screens/
│   │       ├── services/
│   │       ├── types/
│   │       └── __tests__/
│   ├── shared/                   # 他機能でも再利用可能な汎用要素
│   │   ├── components/
│   │   ├── constants/
│   │   ├── test-support/
│   │   │   └── renderWithProviders.jsx
│   │   └── utils/
│   └── types/                    # 横断型定義
├── tests/
│   └── e2e/                      # 将来の自動シナリオテスト
├── docs/                         # 永続ドキュメント
│   └── ideas/                    # 要求整理メモ
├── .agents/                      # Codex補助情報
├── .steering/                    # 作業単位の構造化メモ
├── jsconfig.json                 # JavaScript向け補助設定（必要に応じて）
├── package.json
├── eslint.config.js
└── vitest.config.js
```

## ディレクトリ詳細

### `assets/`

**役割**: オフラインで必ず利用できる画像・音声アセットを配置する

**配置ファイル**:
- `assets/cards/*`: カード絵柄
- `assets/audio/*`: 効果音
- `assets/icons/*`: ホーム画面やボタン用アイコン

**命名規則**:
- ファイル名は `kebab-case`
- 同じテーマのアセットは接頭辞を合わせる

### `src/app/`

**役割**: アプリ全体で共有する設定、テーマ、Providerを持つ

**配置ファイル**:
- `theme/*`: 色、余白、タイポグラフィ
- `providers/*`: サウンドや設定などの全体Provider
- `navigation/*`: MVPで必要になった場合のみ画面遷移設定

**依存関係**:
- 依存可能: `shared/`, `features/`
- 依存禁止: `tests/`

### `src/features/memory-game/screens/`

**役割**: ゲームに直接対応する画面コンポーネントを配置する

**配置ファイル**:
- `HomeScreen.jsx`
- `GameScreen.jsx`

**命名規則**:
- 画面は `PascalCase + Screen.jsx`

**依存関係**:
- 依存可能: `components/`, `hooks/`, `shared/`
- 依存禁止: `services/` の端末APIを直接importすること

### `src/features/memory-game/components/`

**役割**: 盤面、カード、進行表示、ボタンなどゲーム専用のUI部品を配置する

**配置ファイル**:
- `GameBoard.jsx`
- `MemoryCard.jsx`
- `ProgressBadge.jsx`

**命名規則**:
- `PascalCase.jsx`

**依存関係**:
- 依存可能: `types/`, `shared/`
- 依存禁止: `screens/`

### `src/features/memory-game/hooks/`

**役割**: ゲーム状態管理と画面ロジックの接着を担う

**配置ファイル**:
- `useGameSession.js`

**命名規則**:
- React hook は `use` で始める

**依存関係**:
- 依存可能: `logic/`, `services/`, `types/`, `shared/`
- 依存禁止: `screens/`

### `src/features/memory-game/logic/`

**役割**: 純粋なゲームルールと状態遷移関数を配置する

**配置ファイル**:
- `createDeck.js`
- `resolveTurn.js`
- `gameSelectors.js`

**命名規則**:
- 関数中心ファイルは `camelCase.js`

**依存関係**:
- 依存可能: `types/`, `shared/utils/`
- 依存禁止: React、Expo、画面コンポーネント

### `src/features/memory-game/services/`

**役割**: 音、振動、将来のローカル保存など、端末依存処理を抽象化する

**配置ファイル**:
- `feedbackService.js`
- `audioService.js`
- `hapticsService.js`

**命名規則**:
- `camelCase.js`

**依存関係**:
- 依存可能: Expo / React Native公式モジュール、`types/`
- 依存禁止: `screens/`

### `src/features/memory-game/__tests__/`

**役割**: `Vitest` + `@testing-library/react-native` を使う component test を配置する

**配置ファイル**:
- `HomeScreen.test.jsx`
- `GameScreen.test.jsx`
- `GameBoard.test.jsx`

**命名規則**:
- `*.test.jsx`

**依存関係**:
- 依存可能: `screens/`, `components/`, `hooks/`, `shared/test-support/`
- 依存禁止: 実機専用の端末依存確認をここで完結させること

### `src/features/memory-game/types/`

**役割**: ゲーム固有の型定義をまとめる

**配置ファイル**:
- `game.types.js`
- `card.types.js`

**命名規則**:
- JSDoc を含むデータ定義補助ファイルは `*.types.js`

**依存関係**:
- 依存可能: なし、または `shared/types`
- 依存禁止: UI、サービス

### `src/shared/`

**役割**: 複数機能で再利用可能な汎用部品を持つ

**配置ファイル**:
- `components/*`: 共通ボタン、レイアウト
- `constants/*`: アプリ共通定数
- `utils/*`: 純粋関数ユーティリティ
- `test-support/*`: テスト補助関数

**依存関係**:
- feature固有知識を持たないこと

### `src/shared/test-support/`

**役割**: component test 用の共通ラッパーや test helper を持つ

**配置ファイル**:
- `renderWithProviders.jsx`: Theme / Provider をまとめた test render helper

**命名規則**:
- helper は `camelCase.jsx` または `camelCase.js`

### `tests/e2e/`

**役割**: 将来的な自動シナリオテストを配置する。MVPの必須品質ゲートではない

**構造**:
```text
tests/e2e/
└── memory-game/
    ├── start-game.e2e.js
    └── clear-game.e2e.js
```

## ファイル配置規則

### ソースファイル

| ファイル種別 | 配置先 | 命名規則 | 例 |
|------------|--------|---------|-----|
| 画面 | `src/features/memory-game/screens/` | `PascalCase + Screen.jsx` | `GameScreen.jsx` |
| UIコンポーネント | `src/features/memory-game/components/` | `PascalCase.jsx` | `MemoryCard.jsx` |
| Hook | `src/features/memory-game/hooks/` | `use*.js` | `useGameSession.js` |
| 純粋ロジック | `src/features/memory-game/logic/` | `camelCase.js` | `resolveTurn.js` |
| 端末サービス | `src/features/memory-game/services/` | `camelCase.js` | `feedbackService.js` |
| データ定義補助 | `src/features/memory-game/types/` | `*.types.js` | `game.types.js` |

### テストファイル

| テスト種別 | 配置先 | 命名規則 | 例 |
|-----------|--------|---------|-----|
| ユニットテスト | 対象ファイルと同階層の `__tests__/` または同階層 | `*.test.js` | `resolveTurn.test.js` |
| コンポーネントテスト | `src/features/memory-game/__tests__/` | `*.test.jsx` | `GameScreen.test.jsx` |
| 実機確認記録 | `.steering/[YYYYMMDD]-[task]/tasklist.md` | チェック項目を箇条書きで追記 | オフライン起動確認 |
| E2Eテスト | `tests/e2e/` | `*.e2e.js` | `start-game.e2e.js` |

### 設定ファイル

| ファイル種別 | 配置先 | 命名規則 |
|------------|--------|---------|
| ツール設定 | プロジェクトルート | 既存ツール標準に従う |
| ドキュメント | `docs/` | `kebab-case.md` |
| ステアリング | `.steering/[YYYYMMDD]-[task]/` | テンプレート名固定 |

## 命名規則

### ディレクトリ名

- feature配下は `kebab-case`
- 汎用カテゴリは複数形を使う
- 一時ディレクトリや曖昧な名前 (`misc`, `tmp`, `helpers`) は作らない

### ファイル名

- Reactコンポーネント: `PascalCase`
- hook / service / util: `camelCase`
- データ定義補助: `*.types.js`
- ドキュメント: `kebab-case.md`

## 依存関係のルール

### レイヤー間の依存

```text
screens
  ↓
hooks
  ↓
logic

hooks
  ↓
services
```

**禁止される依存**:
- `logic` -> `hooks` / `screens`
- `services` -> `screens`
- `shared` -> `features/memory-game`
- feature間の循環依存

### モジュール間の依存

- 共通化したい知識は `shared/` に移す前に、本当に再利用されるか確認する
- 絵柄や盤面仕様のようなドメイン知識は `features/memory-game/` に残す
- 端末APIを使う処理は必ず `services/` に閉じ込める

## スケーリング戦略

- 難易度追加時は `features/memory-game/types/` と `logic/` を中心に拡張する
- 他ゲームモードを追加する場合は `src/features/` 配下に別featureを切る
- ローカル保存や設定機能を追加する場合は `services/` と `src/app/providers/` を拡張する
