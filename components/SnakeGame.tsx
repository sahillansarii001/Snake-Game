import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GestureControls } from './GestureControls';
import { ScoreBoard } from './ScoreBoard';
import { GAME_CONFIG, Direction } from '../constants/GameConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SnakeGame() {
  const {
    snake,
    food,
    isGameOver,
    score,
    changeDirection,
    resetGame,
  } = useSnakeGame();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Prevent default scrolling when using arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
        
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            changeDirection(Direction.UP);
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            changeDirection(Direction.DOWN);
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            changeDirection(Direction.LEFT);
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            changeDirection(Direction.RIGHT);
            break;
        }
      };
      window.addEventListener('keydown', handleKeyDown as EventListener);
      return () => window.removeEventListener('keydown', handleKeyDown as EventListener);
    }
  }, [changeDirection]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureControls changeDirection={changeDirection}>
        <SafeAreaView style={styles.container}>
          <ScoreBoard score={score} />
          
          <View style={styles.gameArea}>
            <GameBoard snake={snake} food={food} isGameOver={isGameOver} />
            
            {isGameOver && (
              <View style={styles.gameOverOverlay}>
                <Text style={styles.gameOverText}>GAME OVER</Text>
                <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                  <Text style={styles.resetButtonText}>PLAY AGAIN</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <GameControls changeDirection={changeDirection} />
        </SafeAreaView>
      </GestureControls>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GAME_CONFIG.COLORS.BACKGROUND,
    alignItems: 'center',
  },
  gameArea: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  gameOverOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Very dark overlay
    padding: 40,
    borderWidth: 4,
    borderColor: GAME_CONFIG.COLORS.TEXT,
    borderStyle: 'dashed', // Arcade style border
    shadowColor: GAME_CONFIG.COLORS.TEXT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    zIndex: 100,
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF0000', // Hard Red
    marginBottom: 30,
    letterSpacing: 6,
    fontFamily: 'monospace',
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  resetButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderWidth: 3,
    borderColor: GAME_CONFIG.COLORS.SNAKE_HEAD,
  },
  resetButtonText: {
    color: GAME_CONFIG.COLORS.SNAKE_HEAD,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'monospace',
    textShadowColor: GAME_CONFIG.COLORS.SNAKE_HEAD,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
