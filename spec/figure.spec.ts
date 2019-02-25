import { Figure, FigureForm } from "../typing/figure";
import { Board } from "../typing/board";
import { Block } from "../typing/block";
import { getFigureCentralBlock } from "../src/figure";

// central block is the first one in the .blocks array
const GetCentraLBlockCases: Figure[] = [
  {
    form: FigureForm.Square,
    blocks: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
  },
  {
    form: FigureForm.Square,
    blocks: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }]
  },
  {
    form: FigureForm.Sausage,
    blocks: [{ x: 2, y: 1 }, { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }]
  },
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
  }
];
fdescribe("getFigureCentralBlock", () => {
  GetCentraLBlockCases.forEach((figure, index) => {
    it(`return right block for case #${index}`, () => {
      expect(getFigureCentralBlock(figure)).toBe(figure.blocks[0]);
    });
  });
});
