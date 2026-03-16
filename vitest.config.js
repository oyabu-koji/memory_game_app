import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@testing-library/react-native':
        '/Users/oyabu/dev/repos/memory_game/memory_game_app/test/mocks/testing-library-react-native.js',
      'react-native': '/Users/oyabu/dev/repos/memory_game/memory_game_app/test/mocks/react-native.js',
      'expo-av': '/Users/oyabu/dev/repos/memory_game/memory_game_app/test/mocks/expo-av.js',
      'expo-haptics': '/Users/oyabu/dev/repos/memory_game/memory_game_app/test/mocks/expo-haptics.js',
      'react-native/Libraries/Animated/NativeAnimatedHelper':
        '/Users/oyabu/dev/repos/memory_game/memory_game_app/test/mocks/native-animated-helper.js',
    },
  },
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./vitest.setup.js'],
    include: [
      'src/**/*.{test,spec}.{js,jsx}',
      'test/**/*.{test,spec}.{js,jsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '.steering/**',
        '.agents/**',
        '**/*.config.{ts,js}',
        '**/types/**',
        'test/mocks/**',
      ],
      thresholds: {
        branches: 75,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
