import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Block } from "../typing/block";
import { getFigureCentralBlock, rotateFigure } from "../src/figure";

// central block is the first one in the .blocks array
const Square1: Figure = {
  form: FigureForm.Square,
  blocks: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
};
const Square2: Figure = {
  form: FigureForm.Square,
  blocks: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }]
};

const Sausage1: Figure = {
  form: FigureForm.Sausage,
  blocks: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }]
};
const Sausage1_rotated: Figure = {
  form: FigureForm.Sausage,
  blocks: [{ x: 2, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
};

const Sausage2: Figure = {
  form: FigureForm.Sausage,
  blocks: [{ x: 2, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
};
const Sausage2_rotated: Figure = {
  form: FigureForm.Sausage,
  blocks: [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
};

const GetCentraLBlockCases: Figure[] = [
  Square1,
  Square2,
  Sausage1,
  {
    form: FigureForm.Sausage,
    blocks: [{ x: 2, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 2, y: 4 }]
  },
  {
    form: FigureForm.Cross,
    blocks: [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }]
  },
  {
    form: FigureForm.Cross,
    blocks: [{ x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }]
  },
  {
    form: FigureForm.Cross,
    blocks: [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
  },
  {
    form: FigureForm.Cross,
    blocks: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 2 }]
  },
  {
    form: FigureForm.Cripple,
    blocks: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }]
  },
  {
    form: FigureForm.Cripple,
    blocks: [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }]
  },
  {
    form: FigureForm.CrippleRev,
    blocks: [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
  },
  {
    form: FigureForm.CrippleRev,
    blocks: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 0 }]
  },
  {
    form: FigureForm.Pipe,
    blocks: [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 2 }, { x: 1, y: 2 }]
  },
  {
    form: FigureForm.Pipe,
    blocks: [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }]
  },
  {
    form: FigureForm.PipeRev,
    blocks: [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }]
  },
  {
    form: FigureForm.PipeRev,
    blocks: [{ x: 1, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }]
  }
];
describe("getFigureCentralBlock", () => {
  GetCentraLBlockCases.forEach((figure, index) => {
    it(`return right block for case #${index}`, () => {
      expect(getFigureCentralBlock(figure)).toBe(figure.blocks[0]);
    });
  });
});

const RotationCases: { start: Figure; end: Figure; testNumber: number }[] = [
  {
    testNumber: 1,
    start: Square1,
    end: Square1
  },
  {
    testNumber: 2,
    start: Sausage1,
    end: Sausage1_rotated
  },
  {
    testNumber: 3,
    start: Sausage2,
    end: Sausage2_rotated
  }
];

describe("rotateFigure", () => {
  RotationCases.forEach(c => {
    it(`returns correct rotated figure for case #${c.testNumber}`, () => {
      expect(rotateFigure(c.start)).toEqual(c.end);
    });
  });
});
