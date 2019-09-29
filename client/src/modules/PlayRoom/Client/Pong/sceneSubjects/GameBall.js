import {
  Mesh,
  MeshStandardMaterial,
  MeshNormalMaterial,
  BoxGeometry,
  DoubleSide,
  FrontSide,
  BackSide,
  SphereBufferGeometry,
} from 'three';

class GameBall {
  constructor(scene) {
    this.initBall(scene);
  }

  initBall(scene) {
    const geometry = new SphereBufferGeometry(6, 64, 64);
    const material = new MeshNormalMaterial({ wireframe: false });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    this.mesh = mesh;
  }

  update({ x, y, z }) {
    this.mesh.position.set(x, y, z);
  }
}

export default GameBall;
