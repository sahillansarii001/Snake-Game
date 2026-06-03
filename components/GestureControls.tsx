import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Direction } from '../constants/GameConfig';

interface GestureControlsProps {
  children: ReactNode;
  changeDirection: (direction: Direction) => void;
}

export const GestureControls: React.FC<GestureControlsProps> = ({ children, changeDirection }) => {
  const panGesture = Gesture.Pan()
    .onEnd((e) => {
      const { translationX, translationY } = e;

      if (Math.abs(translationX) > Math.abs(translationY)) {
        // Horizontal swipe
        if (translationX > 0) {
          changeDirection(Direction.RIGHT);
        } else {
          changeDirection(Direction.LEFT);
        }
      } else {
        // Vertical swipe
        if (translationY > 0) {
          changeDirection(Direction.DOWN);
        } else {
          changeDirection(Direction.UP);
        }
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>{children}</View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
