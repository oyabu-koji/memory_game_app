import ReactTestRenderer, { act } from 'react-test-renderer';

const mountedRenderers = new Set();
let latestRenderer = null;

function getRoot() {
  if (!latestRenderer) {
    throw new Error('Nothing has been rendered yet.');
  }

  return latestRenderer.root;
}

function flattenText(children) {
  return children
    .flatMap((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }

      if (Array.isArray(child)) {
        return flattenText(child);
      }

      if (child?.children) {
        return flattenText(child.children);
      }

      return '';
    })
    .join('');
}

function getNodesByPredicate(predicate) {
  return getRoot().findAll(predicate, { deep: true });
}

function createQueryError(kind, matcher) {
  return new Error(`Unable to find ${kind}: ${matcher}`);
}

export function render(ui) {
  let renderer;

  act(() => {
    renderer = ReactTestRenderer.create(ui);
  });

  mountedRenderers.add(renderer);
  latestRenderer = renderer;

  return {
    rerender(nextUi) {
      act(() => {
        renderer.update(nextUi);
      });
    },
    unmount() {
      act(() => {
        renderer.unmount();
      });
      mountedRenderers.delete(renderer);
      if (latestRenderer === renderer) {
        latestRenderer = null;
      }
    },
    root: renderer.root,
  };
}

export function cleanup() {
  for (const renderer of mountedRenderers) {
    act(() => {
      renderer.unmount();
    });
  }

  mountedRenderers.clear();
  latestRenderer = null;
}

export const fireEvent = {
  press(node) {
    if (node.props.disabled) {
      return;
    }

    act(() => {
      node.props.onPress?.();
    });
  },
};

export async function waitFor(assertion, options = {}) {
  const timeout = options.timeout ?? 1000;
  const start = Date.now();

  while (Date.now() - start <= timeout) {
    try {
      const result = assertion();
      return result;
    } catch (error) {
      await act(async () => {
        await Promise.resolve();
      });

      if (Date.now() - start > timeout) {
        throw error;
      }
    }
  }

  return assertion();
}

export { act };

export const screen = {
  getByTestId(testId) {
    const node = getNodesByPredicate(
      (candidate) =>
        typeof candidate.type === 'string' && candidate.props.testID === testId
    )[0];

    if (!node) {
      throw createQueryError('testID', testId);
    }

    return node;
  },
  getByText(text) {
    const node = getNodesByPredicate(
      (candidate) =>
        candidate.type === 'Text' && flattenText(candidate.children) === text
    )[0];

    if (!node) {
      throw createQueryError('text', text);
    }

    return node;
  },
  queryByText(text) {
    return (
      getNodesByPredicate(
        (candidate) =>
          candidate.type === 'Text' && flattenText(candidate.children) === text
      )[0] ??
      null
    );
  },
  queryAllByText(text) {
    return getNodesByPredicate(
      (candidate) =>
        candidate.type === 'Text' && flattenText(candidate.children) === text
    );
  },
  getAllByRole(role) {
    const nodes = getNodesByPredicate(
      (candidate) =>
        typeof candidate.type === 'string' &&
        candidate.props.accessibilityRole === role
    );

    if (nodes.length === 0) {
      throw createQueryError('role', role);
    }

    return nodes;
  },
};
