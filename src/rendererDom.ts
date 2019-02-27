import { Game } from "../typing/game";
import { Block } from "../typing/block";

export class RendererDom {
  target: any;
  score: any;
  gameOver: any;

  initialize(game: Game) {
    this.target = document.createElement("div");
    this.target.id = "target";
    document.body.appendChild(this.target);
    this.score = document.createElement("div");
    this.score.id = "score";
    document.body.appendChild(this.score);
    this.gameOver = document.createElement("div");
    this.gameOver.id = "game-over";
    this.gameOver.classList.add("hidden");
    this.gameOver.innerText = "Game Over";
    this.target.appendChild(this.gameOver);

    for (let rowIndex = 0; rowIndex < game.board.height; rowIndex++) {
      for (let colIndex = 0; colIndex < game.board.width; colIndex++) {
        var cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.dataset.y = rowIndex.toString();
        cellEl.dataset.x = colIndex.toString();
        this.target.appendChild(cellEl);
      }
    }
  }

  start(game: Game) {
    var animate = () => {
      if (game.isOver) {
        this.gameOver.classList.remove("hidden");
        return;
      }
      requestAnimationFrame(animate);
      Array.from(document.querySelectorAll(".cell"))
        .map(el => ({
          el,
          canvasBlock: getCanvasBlockByEl(game, el as HTMLElement)
        }))
        .forEach(x => {
          if (x.canvasBlock) {
            x.el.classList.add("block");
          } else {
            x.el.classList.remove("block");
          }
        });
      this.score.innerText = game.score.toString();
    };

    animate();
  }
}

function getCanvasBlockByEl(game: Game, el: HTMLElement): Block {
  let boardBlock = game.board.fragments.find(
    b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y
  );
  let shapeBlock = game.figure.blocks.find(
    b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y
  );
  return boardBlock || shapeBlock;
}