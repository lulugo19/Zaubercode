import World from "./World";

class Camera {
  x: number;
  y: number;
  zoom: number;
  world: World;

  constructor(world: World) {
    this.world = world;
  }
}
