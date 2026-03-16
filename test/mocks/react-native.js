import React from 'react';

function createHostComponent(name) {
  return React.forwardRef(({ children, ...props }, ref) =>
    React.createElement(name, { ...props, ref }, children)
  );
}

const View = createHostComponent('View');
const Text = createHostComponent('Text');
const SafeAreaView = createHostComponent('SafeAreaView');
const StatusBar = createHostComponent('StatusBar');

const Pressable = React.forwardRef(
  ({ children, onPress, disabled, ...props }, ref) =>
    React.createElement(
      'Pressable',
      {
        ...props,
        disabled,
        onPress: disabled ? undefined : onPress,
        ref,
      },
      typeof children === 'function' ? children({ pressed: false }) : children
    )
);

function FlatList({
  data = [],
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ...props
}) {
  if (data.length === 0 && ListEmptyComponent) {
    return React.createElement(
      View,
      props,
      React.isValidElement(ListEmptyComponent)
        ? ListEmptyComponent
        : React.createElement(ListEmptyComponent)
    );
  }

  return React.createElement(
    View,
    props,
    data.map((item, index) => {
      const element = renderItem({ item, index });

      if (!React.isValidElement(element)) {
        return element;
      }

      return React.cloneElement(element, {
        key: keyExtractor ? keyExtractor(item, index) : String(index),
      });
    })
  );
}

class AnimatedValue {
  constructor(initialValue) {
    this.value = initialValue;
  }

  setValue(nextValue) {
    this.value = nextValue;
  }

  interpolate({ outputRange }) {
    return outputRange?.[this.value] ?? outputRange?.[0] ?? '0deg';
  }
}

const AnimatedView = createHostComponent('AnimatedView');

const Animated = {
  View: AnimatedView,
  Value: AnimatedValue,
  timing() {
    return {
      start(callback) {
        callback?.({ finished: true });
      },
    };
  },
};

const StyleSheet = {
  create(styles) {
    return styles;
  },
  flatten(value) {
    return value;
  },
  hairlineWidth: 1,
};

function useWindowDimensions() {
  return {
    width: 390,
    height: 844,
    scale: 3,
    fontScale: 1,
  };
}

const Vibration = {
  vibrate() {},
  cancel() {},
};

export {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Vibration,
};
