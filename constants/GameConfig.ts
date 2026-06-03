export type Coordinate = {
  x: number;
  y: number;
};

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const GAME_CONFIG = {
  BOARD_SIZE: 20, // 20x20 grid
  TICK_RATE_MS: 150, // Game speed
  COLORS: {
    BACKGROUND: '#0B0014', // Very dark purple/black
    BOARD_BG: '#120024', // Deep neon purple
    SNAKE_HEAD: '#00FF00', // Neon Green
    SNAKE_BODY: '#EFFF00', // Electric Yellow
    FOOD: '#00FFFF', // Pulsing Neon Cyan
    TEXT: '#FF007F', // Glowing Hot Pink
    ACCENT: '#FF007F', // Glowing Hot Pink for borders
  },
};
