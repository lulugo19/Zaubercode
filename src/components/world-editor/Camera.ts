import BasicBlock from "../../blocks/BasicBlock";
import World from "./World";

export default class Camera {
  x: number = 0;
  y: number = 0;
  zoom: number = 1;
  world: World;

  private middleMouseButtonPressed: boolean = false;

  constructor(world: World) {
    this.world = world;
    this.world.camera = this;
    this.initListeners();
  }

  private initListeners() {
    const worldContainer = this.world.container;

    worldContainer.addEventListener("wheel", e => {
      e.preventDefault();
      const x = e.pageX;
      const y = e.pageY;
      this.zoom += e.deltaY * -0.001;
      this.zoom = Math.max(0.01, this.zoom);
      for (const block of this.world.blocks) {
        block.scale = this.zoom;
      }
    });

    worldContainer.addEventListener("mousedown", e => {
      if (e.target === worldContainer && e.button === 0) {
        this.middleMouseButtonPressed = true;
        worldContainer.style.cursor = "grab";
      }
    });

    document.addEventListener("mouseup", e => {
      if (this.middleMouseButtonPressed && e.button === 0) {
        this.middleMouseButtonPressed = false;
        worldContainer.style.cursor = "default";
      }
    });

    document.addEventListener("mousemove", e => {
      if (this.middleMouseButtonPressed) {
        this.x -= e.movementX;
        this.y += e.movementY;

        this.translateBlocks();
      }
    });
  }

  move(mx: number, my: number) {
    if (mx === 0 && my === 0) {
      return;
    }
    this.x += mx;
    this.y += my;
    this.translateBlocks();
    this.adjustGrid();
  }

  keepInBounds(block: BasicBlock) {
    const bbb = block.getBoundingClientRect();
    const cbb = this.world.container.getBoundingClientRect();

    let mx = 0,
      my = 0;
    if (bbb.left <= cbb.left) {
      mx = cbb.left - bbb.left;
    } else if (bbb.right >= cbb.right) {
      mx = cbb.right - bbb.right;
    }
    if (bbb.top <= cbb.top) {
      my = bbb.top - cbb.top;
    } else if (bbb.bottom >= cbb.bottom) {
      my = bbb.bottom - cbb.bottom;
    }
    this.move(mx, my);
  }

  private adjustGrid() {
    const container = this.world.container;
    container.style.backgroundPosition = `${this.x}px ${-this.y}px`;
  }

  private translateBlocks() {
    for (const block of this.world.blocks) {
      block.camTranslateX = this.x;
      block.camTranslateY = this.y;
    }
  }
}
