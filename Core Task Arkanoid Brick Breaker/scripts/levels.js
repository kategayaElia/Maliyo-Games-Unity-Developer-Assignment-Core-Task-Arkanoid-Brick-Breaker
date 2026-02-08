// scripts/levels.js

/**
 * Generate a brick layout for a given level number.
 * Difficulty scales with level number:
 *  - More rows and columns as level increases
 *  - Brick colors vary by row for visual feedback
 */
function generateLevel(levelNumber) {
  // Difficulty scaling
  const rows = Math.min(3 + Math.floor(levelNumber / 5), 12);   // up to 12 rows
  const cols = Math.min(5 + Math.floor(levelNumber / 10), 14);  // up to 14 columns

  const bricks = [];
  const brickWidth = 360 / cols; // canvas width is 360
  const brickHeight = 20;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * brickWidth;
      const y = r * brickHeight;

      // Color variation by row
      const colors = ["#ff4444", "#44ff44", "#4444ff", "#ffff44", "#ff44ff", "#44ffff"];
      const color = colors[r % colors.length];

      bricks.push(new Brick(x, y, brickWidth - 2, brickHeight - 2, color));
    }
  }

  return bricks;
}

/**
 * Utility to preload all 50 levels (optional).
 * This can be used if you want to cache layouts ahead of time.
 */
function preloadLevels() {
  const allLevels = [];
  for (let i = 1; i <= 50; i++) {
    allLevels[i] = generateLevel(i);
  }
  return allLevels;
}
