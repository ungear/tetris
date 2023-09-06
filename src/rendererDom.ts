import { Game } from "../typing/game";
import { Block } from "../typing/block";
import { Store } from "redux";

export class RendererDom {
  target: any;
  score: any;
  gameOver: any;
  store: Store<Game>;

  initialize(store: Store<Game>) {
    this.store = store;
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

    let { board } = this.store.getState();
    for (let rowIndex = 0; rowIndex < board.height; rowIndex++) {
      for (let colIndex = 0; colIndex < board.width; colIndex++) {
        var cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.dataset.y = rowIndex.toString();
        cellEl.dataset.x = colIndex.toString();
        this.target.appendChild(cellEl);
      }
    }
  }

  start() {
    var animate = () => {
      if (this.store.getState().isOver) {
        this.gameOver.classList.remove("hidden");
        return;
      }
      requestAnimationFrame(animate);
      Array.from(document.querySelectorAll(".cell"))
        .map(el => ({
          el,
          canvasBlock: getCanvasBlockByEl(
            el as HTMLElement,
            this.store.getState()
          )
        }))
        .forEach(x => {
          if (x.canvasBlock) {
            x.el.classList.add("block");
          } else {
            x.el.classList.remove("block");
          }
        });
      this.score.innerText = this.store.getState().score.toString();
    };

    animate();
  }
}

function getCanvasBlockByEl(el: HTMLElement, state: Game): Block {
  let boardBlock = state.board.fragments.find(
    b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y
  );
  let shapeBlock = state.currentFigure.blocks.find(
    b => b.x.toString() === el.dataset.x && b.y.toString() === el.dataset.y
  );
  return boardBlock || shapeBlock;
}
