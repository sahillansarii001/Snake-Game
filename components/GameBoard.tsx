import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Coordinate, GAME_CONFIG } from '../constants/GameConfig';

interface GameBoardProps {
  snake: Coordinate[];
  food: Coordinate;
  isGameOver: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, isGameOver }) => {
  const { width } = useWindowDimensions();
  // Leave some margin around the board, but cap it for large screens (web)
  const BOARD_PIXEL_SIZE = Math.min(width * 0.9, 400);
  const CELL_SIZE = BOARD_PIXEL_SIZE / GAME_CONFIG.BOARD_SIZE;

  return (
    <View style={styles.boardContainer}>
      <View style={[styles.board, { width: BOARD_PIXEL_SIZE, height: BOARD_PIXEL_SIZE }]}>
        {/* Render Food */}
        <View
          style={[
            styles.food,
            {
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
            },
          ]}
        />

        {/* Render Snake */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          return (
            <View
              key={`${segment.x}-${segment.y}-${index}`}
              style={[
                styles.snakeSegment,
                isHead && styles.snakeHead,
                {
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                },
              ]}
            />
          );
        })}

        {/* Game Over Overlay */}
        {isGameOver && (
          <View style={[styles.overlay, { width: BOARD_PIXEL_SIZE, height: BOARD_PIXEL_SIZE }]} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: GAME_CONFIG.COLORS.ACCENT,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
  board: {
    backgroundColor: GAME_CONFIG.COLORS.BOARD_BG,
    borderWidth: 4,
    borderColor: GAME_CONFIG.COLORS.ACCENT,
    position: 'relative',
    overflow: 'hidden',
  },
  snakeSegment: {
    position: 'absolute',
    backgroundColor: GAME_CONFIG.COLORS.SNAKE_BODY,
    borderWidth: 1,
    borderColor: '#000000', // hard digital segments
  },
  snakeHead: {
    backgroundColor: GAME_CONFIG.COLORS.SNAKE_HEAD,
    zIndex: 10,
    shadowColor: GAME_CONFIG.COLORS.SNAKE_HEAD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  food: {
    position: 'absolute',
    backgroundColor: GAME_CONFIG.COLORS.FOOD,
    borderRadius: 2, // slightly rounded for a diamond/orb feel
    shadowColor: GAME_CONFIG.COLORS.FOOD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(11, 0, 20, 0.85)',
    zIndex: 20,
  },
});
