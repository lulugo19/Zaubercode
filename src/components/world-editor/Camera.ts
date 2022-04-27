import BasicBlock from "../../blocks/BasicBlock";
import World from "./World";

export default class Camera {
  x: number = 0;
  y: number = 0;
  zoom: number = 0;
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

    worldContainer.addEventListener("scroll", event => {
      worldContainer.style.backgroundPosition = `-${worldContainer.scrollLeft}px -${worldContainer.scrollTop}px`;
    });
  }

  keepInBounds(block: BasicBlock) {
    const bbb = block.getBoundingClientRect();
    const cbb = this.world.container.getBoundingClientRect();

    if (bbb.left <= cbb.left) {
      this.x += cbb.left - bbb.left;
    }
    if (bbb.right >= cbb.right) {
      this.x += cbb.right - bbb.right;
    }
    if (bbb.top <= cbb.top) {
      this.y += bbb.top - cbb.top;
    }
    if (bbb.bottom >= cbb.bottom) {
      this.y += bbb.bottom - cbb.bottom;
    }

    this.translateBlocks();
  }

  private translateBlocks() {
    for (const block of this.world.blocks) {
      block.camTranslateX = this.x;
      block.camTranslateY = this.y;
    }
  }
}
