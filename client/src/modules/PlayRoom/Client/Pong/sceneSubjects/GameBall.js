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
    const geometry = new SphereBufferGeometry(5, 64, 64);
    const material = new MeshNormalMaterial({ wireframe: false });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    this.mesh = mesh;
  }
}

export default GameBall;
