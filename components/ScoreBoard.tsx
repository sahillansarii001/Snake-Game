import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GAME_CONFIG } from '../constants/GameConfig';

interface ScoreBoardProps {
  score: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SNAKE</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>SCORE</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: GAME_CONFIG.COLORS.ACCENT,
    borderStyle: 'solid',
    shadowColor: GAME_CONFIG.COLORS.ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: GAME_CONFIG.COLORS.TEXT,
    letterSpacing: 4,
    fontFamily: 'monospace',
    textShadowColor: GAME_CONFIG.COLORS.TEXT,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: GAME_CONFIG.COLORS.FOOD,
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'monospace',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
