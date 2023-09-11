import { Figure, FigureForm } from "../typing/figure";
import { rotateFigure } from "../src/figure";
import { cloneDeep } from "lodash";

const Square1: Figure = {
  form: FigureForm.Square,
  blocks: [
    { x: 0, y: 0, color: 0 },
    { x: 1, y: 0, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: 0, y: 1, color: 0 }
  ],
  centralBlockIndex: 0
};

const Sausage1: Figure = {
  form: FigureForm.Sausage,
  blocks: [
    { x: 2, y: 1, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: 3, y: 1, color: 0 },
    { x: 4, y: 1, color: 0 }
  ],
  centralBlockIndex: 0
};
const Sausage1_rotated: Figure = {
  form: FigureForm.Sausage,
  blocks: [
    { x: 2, y: 1, color: 0 },
    { x: 2, y: 0, color: 0 },
    { x: 2, y: 2, color: 0 },
    { x: 2, y: 3, color: 0 }
  ],
  centralBlockIndex: 0
};

const Sausage2: Figure = {
  form: FigureForm.Sausage,
  blocks: [
    { x: 2, y: 1, color: 0 },
    { x: 2, y: 0, color: 0 },
    { x: 2, y: 2, color: 0 },
    { x: 2, y: 3, color: 0 }
  ],
  centralBlockIndex: 0
};
const Sausage2_rotated: Figure = {
  form: FigureForm.Sausage,
  blocks: [
    { x: 2, y: 1, color: 0 },
    { x: 3, y: 1, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: 0, y: 1, color: 0 }
  ],
  centralBlockIndex: 0
};

const Cripple1: Figure = {
  form: FigureForm.Cripple,
  blocks: [
    { x: 1, y: 0, color: 0 },
    { x: 0, y: 0, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: 2, y: 1, color: 0 }
  ],
  centralBlockIndex: 0
};

const Cripple1_rotated: Figure = {
  form: FigureForm.Cripple,
  blocks: [
    { x: 1, y: 0, color: 0 },
    { x: 1, y: -1, color: 0 },
    { x: 0, y: 0, color: 0 },
    { x: 0, y: 1, color: 0 }
  ],
  centralBlockIndex: 0
};

const CrippleRev1: Figure = {
  form: FigureForm.CrippleRev,
  blocks: [
    { x: 0, y: 1, color: 0 },
    { x: 0, y: 0, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: 1, y: 2, color: 0 }
  ],
  centralBlockIndex: 0
};

const CrippleRev1_rotated: Figure = {
  form: FigureForm.CrippleRev,
  blocks: [
    { x: 0, y: 1, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: 0, y: 2, color: 0 },
    { x: -1, y: 2, color: 0 }
  ],
  centralBlockIndex: 0
};

const Pipe1: Figure = {
  form: FigureForm.Pipe,
  blocks: [
    { x: 0, y: 1, color: 0 },
    { x: 0, y: 0, color: 0 },
    { x: 0, y: 2, color: 0 },
    { x: 1, y: 2, color: 0 }
  ],
  centralBlockIndex: 0
};

const Pipe1_rotated: Figure = {
  form: FigureForm.Pipe,
  blocks: [
    { x: 0, y: 1, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: -1, y: 1, color: 0 },
    { x: -1, y: 2, color: 0 }
  ],
  centralBlockIndex: 0
};

const Pipe2: Figure = {
  form: FigureForm.Pipe,
  blocks: [
    { x: 1, y: 0, color: 0 },
    { x: 2, y: 0, color: 0 },
    { x: 0, y: 0, color: 0 },
    { x: 0, y: 1, color: 0 }
  ],
  centralBlockIndex: 0
};

const Pipe2_rotated: Figure = {
  form: FigureForm.Pipe,
  blocks: [
    { x: 1, y: 0, color: 0 },
    { x: 1, y: 1, color: 0 },
    { x: 1, y: -1, color: 0 },
    { x: 0, y: -1, color: 0 }
  ],
  centralBlockIndex: 0
};

const PipeRev1: Figure = {
  form: FigureForm.Pipe,
  blocks: [
    { x: 1, y: 1, color: 0 },
    { x: 1, y: 0, color: 0 },
    { x: 1, y: 2, color: 0 },
    { x: 0, y: 2, color: 0 }
  ],
  centralBlockIndex: 0
};

const PipeRev1_rotated: Figure = {
  form: FigureForm.Pipe,
  blocks: [
    { x: 1, y: 1, color: 0 },
    { x: 2, y: 1, color: 0 },
    { x: 0, y: 1, color: 0 },
    { x: 0, y: 0, color: 0 }
  ],
  centralBlockIndex: 0
};

const RotationCases: { start: Figure; end: Figure; testNumber: number }[] = [
  {
    testNumber: 1,
    start: cloneDeep(Square1),
    end: cloneDeep(Square1)
  },
  {
    testNumber: 2,
    start: cloneDeep(Sausage1),
    end: cloneDeep(Sausage1_rotated)
  },
  {
    testNumber: 3,
    start: cloneDeep(Sausage2),
    end: cloneDeep(Sausage2_rotated)
  },
  {
    testNumber: 4,
    start: cloneDeep(Cripple1),
    end: cloneDeep(Cripple1_rotated)
  },
  {
    testNumber: 5,
    start: cloneDeep(CrippleRev1),
    end: cloneDeep(CrippleRev1_rotated)
  },
  {
    testNumber: 6,
    start: cloneDeep(Pipe1),
    end: cloneDeep(Pipe1_rotated)
  },
  {
    testNumber: 7,
    start: cloneDeep(Pipe2),
    end: cloneDeep(Pipe2_rotated)
  },
  {
    testNumber: 8,
    start: cloneDeep(PipeRev1),
    end: cloneDeep(PipeRev1_rotated)
  }
];

describe("rotateFigure", () => {
  RotationCases.forEach(c => {
    it(`returns correct rotated figure for case #${c.testNumber}`, () => {
      expect(rotateFigure(c.start)).toEqual(c.end);
    });
  });
});
