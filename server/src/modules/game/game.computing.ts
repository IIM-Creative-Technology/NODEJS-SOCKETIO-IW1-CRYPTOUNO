export const ComputeLines = (board: number[], size: number) =>
  board.reduce<Array<number[]>>((acc, curr, index) => {
    if (index % size === 0) {
      acc.push([]);
    }
    (acc[acc.length - 1] as number[]).push(curr);
    return acc;
  }, []);

export const ComputeColumns = (board: number[], size: number) => {
  const mappedBoard = board.map((_, index) => index);
  const columns: Array<number[]> = Array.from({ length: size }, () => []);
  for (let cellIndex = 0; cellIndex < 49; cellIndex++)
    for (let columnIndex = 0; columnIndex < size; columnIndex++)
      for (let k = 0; k <= size; k++)
        if (mappedBoard[cellIndex] == columnIndex + 7 * k)
          columns[columnIndex].push(mappedBoard[cellIndex]);
  return columns;
};

export const ComputeDiagonals = (
  lines: Array<number[]>,
  target: 'primary' | 'secondary',
) => {
  const ComputeRow = (
    offset: number,
    cellRowIndex: number,
    linesLength: number,
  ) => {
    let diagLength = linesLength;
    const diagonal: number[] = [];
    while (diagLength--) {
      if (
        typeof lines[diagLength][
          cellRowIndex + (offset ? offset - diagLength : diagLength)
        ] === 'number'
      )
        diagonal.push(
          lines[diagLength][
            cellRowIndex + (offset ? offset - diagLength : diagLength)
          ],
        );
    }
    return diagonal;
  };

  const diagonals: Array<number[]> = [];
  let cellRowIndex = 0;
  for (
    cellRowIndex = 1 - lines.length;
    cellRowIndex < lines[0].length;
    cellRowIndex++
  )
    diagonals.push(
      ComputeRow(
        target === 'primary' ? 0 : lines.length - 1,
        cellRowIndex,
        lines.length,
      ),
    );

  return diagonals;
};

export const GetConsecutiveCells = (board: number[], targetCell: number) => [
  [...board].splice(0, board.indexOf(targetCell)).reverse(),
  [...board].splice(board.indexOf(targetCell) + 1),
];

export const GetLine = (lines: Array<number[]>, targetCell: number) =>
  lines.find((line) => line.includes(targetCell)) ?? [];
export const GetColumn = (columns: Array<number[]>, targetCell: number) =>
  columns.find((column) => column.includes(targetCell)) ?? [];
export const GetDiagonal = (diagonals: Array<number[]>, targetCell: number) =>
  diagonals.find((diagonal) => diagonal.includes(targetCell)) ?? [];

export const GetFirstAvailableCellCol = (column: number[], board: number[]) => {
  const sortedCols = column.sort((a, b) => b - a);
  for (let i = 0; i < sortedCols.length; i++)
    if (board[sortedCols[i]] === 0) return sortedCols[i];
  return null;
};

export const CheckWinOnAxis = (
  axis: number[],
  targetCell: number,
  activePlayer: number,
  board: number[],
) => {
  const mappedAxis = GetConsecutiveCells(axis, targetCell);
  let winCoordinates = [targetCell];
  let countConsecutiveTokens = 1;

  for (const axis of mappedAxis) {
    for (let axisIndex = 0; axisIndex < axis.length; axisIndex++) {
      if (board[axis[axisIndex]] === activePlayer) {
        winCoordinates.push(axis[axisIndex]);
        countConsecutiveTokens++;
      } else break;
    }
  }

  const isGameWin = countConsecutiveTokens >= 4;
  const sortedCoordinates = winCoordinates.sort((a, b) => a - b);
  return [
    isGameWin,
    isGameWin
      ? [sortedCoordinates[0], sortedCoordinates[sortedCoordinates.length - 1]]
      : [],
  ];
};
