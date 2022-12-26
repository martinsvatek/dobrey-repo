import { Level } from '../../page.types';
import { getLinearInterpolation, getPositionX } from '../../utils';
import {
  VISUALIZER_ARROW_ALIGN,
  VISUALIZER_ARROW_BASELINE,
  VISUALIZER_ARROW_COLOR,
  VISUALIZER_ARROW_FONT,
  VISUALIZER_INNER_HEIGHT,
  VISUALIZER_INNER_POSITION_LEFT,
  VISUALIZER_INNER_POSITION_RIGHT,
  VISUALIZER_INNER_POSITION_TOP,
  VISUALIZER_LINE_WIDTH,
  VISUALIZER_NODE_RADIUS,
} from './drawVisualizer.consts';
import { getRGBA } from './drawVisualizer.utils';

export const drawVisualizer = (
  canvasContext: CanvasRenderingContext2D,
  levels: Level[],
  time?: number
): void => {
  /**
   * @NOTE: animace pohybu
   */
  if (time) {
    canvasContext.lineDashOffset = -time / 40;
  }

  for (let i = 0; i <= levels.length - 1; i++) {
    const { biases, inputs, outputs, weights } = levels[i];

    const levelHeight = VISUALIZER_INNER_HEIGHT / levels.length;
    const levelPositionTop =
      VISUALIZER_INNER_POSITION_TOP +
      getLinearInterpolation(
        VISUALIZER_INNER_HEIGHT - levelHeight,
        0,
        levels.length === 1 ? 0.5 : i / (levels.length - 1)
      );
    const levelPositionBottom = levelPositionTop + levelHeight;

    /**
     * @NOTE: linie spojujici nody
     */
    for (let j = 0; j <= inputs.length - 1; j++) {
      for (let k = 0; k <= outputs.length - 1; k++) {
        const lineBottomPositionX = getPositionX(
          VISUALIZER_INNER_POSITION_LEFT,
          VISUALIZER_INNER_POSITION_RIGHT,
          inputs.length,
          j
        );
        const lineTopPositionX = getPositionX(
          VISUALIZER_INNER_POSITION_LEFT,
          VISUALIZER_INNER_POSITION_RIGHT,
          outputs.length,
          k
        );

        const weight = weights[j][k];

        canvasContext.setLineDash([4, 20]);
        canvasContext.lineWidth = VISUALIZER_LINE_WIDTH;
        canvasContext.strokeStyle = getRGBA(weight);
        canvasContext.beginPath();
        canvasContext.moveTo(lineBottomPositionX, levelPositionBottom);
        canvasContext.lineTo(lineTopPositionX, levelPositionTop);
        canvasContext.stroke();
      }
    }

    /**
     * @NOTE: nody na vstupu
     */
    for (let j = 0; j <= inputs.length - 1; j++) {
      const nodePositionX = getPositionX(
        VISUALIZER_INNER_POSITION_LEFT,
        VISUALIZER_INNER_POSITION_RIGHT,
        inputs.length,
        j
      );

      canvasContext.fillStyle = getRGBA(inputs[j] || 0.05);
      canvasContext.beginPath();
      canvasContext.arc(nodePositionX, levelPositionBottom, VISUALIZER_NODE_RADIUS, 0, Math.PI * 2);
      canvasContext.fill();
    }

    /**
     * @NOTE: nody ve vrstvach
     */
    for (let j = 0; j <= outputs.length - 1; j++) {
      const nodePositionX = getPositionX(
        VISUALIZER_INNER_POSITION_LEFT,
        VISUALIZER_INNER_POSITION_RIGHT,
        outputs.length,
        j
      );

      canvasContext.fillStyle = getRGBA(outputs[j]);
      canvasContext.beginPath();
      canvasContext.arc(nodePositionX, levelPositionTop, VISUALIZER_NODE_RADIUS, 0, Math.PI * 2);
      canvasContext.fill();

      if (i === levels.length - 1) {
        const arrows = ['↑', '↓', '←', '→'];

        canvasContext.beginPath();
        canvasContext.textAlign = VISUALIZER_ARROW_ALIGN;
        canvasContext.textBaseline = VISUALIZER_ARROW_BASELINE;
        canvasContext.fillStyle = VISUALIZER_ARROW_COLOR;
        canvasContext.font = VISUALIZER_ARROW_FONT;
        canvasContext.fillText(arrows[j], nodePositionX, levelPositionTop);
      }

      /**
       * @NOTE: tendence kolem nodu
       */
      canvasContext.setLineDash([1, 1]);
      canvasContext.lineWidth = VISUALIZER_LINE_WIDTH * 4;
      canvasContext.strokeStyle = getRGBA(biases[j]);
      canvasContext.beginPath();
      canvasContext.arc(
        nodePositionX,
        levelPositionTop,
        VISUALIZER_NODE_RADIUS + VISUALIZER_LINE_WIDTH * 4,
        0,
        Math.PI * 2
      );
      canvasContext.stroke();
    }
  }
};
