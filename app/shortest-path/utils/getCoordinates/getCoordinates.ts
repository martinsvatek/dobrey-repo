import { GRID_CANVAS_HEIGHT, GRID_CANVAS_WIDTH } from 'app/shortest-path/page.consts';
import { Coordinate } from 'app/shortest-path/page.types';

export const getCoordinates = (
  rowClickPosition: number,
  columnClickPosition: number
): Coordinate => {
  let row = 0;
  const rowReminder = rowClickPosition % 10;

  if (rowClickPosition < 5) {
    row = 5;
  } else if (rowClickPosition > GRID_CANVAS_HEIGHT - 5) {
    row = GRID_CANVAS_HEIGHT - 5;
  } else if (rowReminder === 0) {
    row = rowClickPosition + 5;
  } else if (rowReminder === 5) {
    row = rowClickPosition;
  } else if (rowReminder < 5) {
    row = rowClickPosition - rowReminder + 5;
  } else {
    row = rowClickPosition - rowReminder + 5;
  }

  let column = 0;
  const columnReminder = columnClickPosition % 10;

  if (columnClickPosition < 5) {
    column = 5;
  } else if (columnClickPosition > GRID_CANVAS_WIDTH - 5) {
    column = GRID_CANVAS_WIDTH - 5;
  } else if (columnReminder === 0) {
    column = columnClickPosition + 5;
  } else if (columnReminder === 5) {
    column = columnClickPosition;
  } else if (columnReminder < 5) {
    column = columnClickPosition - columnReminder + 5;
  } else {
    column = columnClickPosition - columnReminder + 5;
  }

  return { row, column };
};
