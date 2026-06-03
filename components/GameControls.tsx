import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Direction, GAME_CONFIG } from '../constants/GameConfig';

interface GameControlsProps {
  changeDirection: (direction: Direction) => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ changeDirection }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeDirection(Direction.UP)}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-up" size={32} color={GAME_CONFIG.COLORS.TEXT} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeDirection(Direction.LEFT)}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={32} color={GAME_CONFIG.COLORS.TEXT} />
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeDirection(Direction.RIGHT)}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={32} color={GAME_CONFIG.COLORS.TEXT} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeDirection(Direction.DOWN)}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-down" size={32} color={GAME_CONFIG.COLORS.TEXT} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000000',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // chunky square buttons
    margin: 5,
    borderWidth: 3,
    borderColor: GAME_CONFIG.COLORS.ACCENT,
    borderBottomWidth: 6, // 3d arcade effect
    shadowColor: GAME_CONFIG.COLORS.ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  spacer: {
    width: 70,
  },
});
