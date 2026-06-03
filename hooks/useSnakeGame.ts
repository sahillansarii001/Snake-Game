import { useState, useEffect, useCallback, useRef } from 'react';
import { Coordinate, Direction, GAME_CONFIG } from '../constants/GameConfig';

const generateRandomFood = (snake: Coordinate[]): Coordinate => {
  let newFood: Coordinate;
  let isOccupied = true;
  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE),
      y: Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE),
    };
    // eslint-disable-next-line no-loop-func
    isOccupied = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
  }
  return newFood!;
};

const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = Direction.UP;

export function useSnakeGame() {
  const [snake, setSnake] = useState<Coordinate[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Coordinate>(() => generateRandomFood(INITIAL_SNAKE));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Use refs to avoid closures in the game loop with old state
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const changeDirection = useCallback(
    (newDirection: Direction) => {
      if (isGameOver || isPaused) return;

      const currentDir = directionRef.current;
      const isValidMove =
        (newDirection === Direction.UP && currentDir !== Direction.DOWN) ||
        (newDirection === Direction.DOWN && currentDir !== Direction.UP) ||
        (newDirection === Direction.LEFT && currentDir !== Direction.RIGHT) ||
        (newDirection === Direction.RIGHT && currentDir !== Direction.LEFT);

      if (isValidMove) {
        nextDirectionRef.current = newDirection;
      }
    },
    [isGameOver, isPaused]
  );

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionRef.current = INITIAL_DIRECTION;
    setFood(generateRandomFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const currentDir = nextDirectionRef.current;
        setDirection(currentDir); // Commit the direction change

        const newHead = { ...head };

        switch (currentDir) {
          case Direction.UP:
            newHead.y -= 1;
            break;
          case Direction.DOWN:
            newHead.y += 1;
            break;
          case Direction.LEFT:
            newHead.x -= 1;
            break;
          case Direction.RIGHT:
            newHead.x += 1;
            break;
        }

        // Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GAME_CONFIG.BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GAME_CONFIG.BOARD_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Self Collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateRandomFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, GAME_CONFIG.TICK_RATE_MS);
    return () => clearInterval(intervalId);
  }, [isGameOver, isPaused, food]);

  return {
    snake,
    food,
    direction,
    isGameOver,
    score,
    isPaused,
    changeDirection,
    resetGame,
    togglePause,
  };
}
