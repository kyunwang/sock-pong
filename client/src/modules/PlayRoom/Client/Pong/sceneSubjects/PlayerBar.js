import {
  Mesh,
  MeshStandardMaterial,
  MeshNormalMaterial,
  BoxGeometry,
  DoubleSide,
  FrontSide,
  BackSide,
} from 'three';
import { playerSettings } from '../consts';

class PlayerBar {
  constructor(scene) {
    const geometry = new BoxGeometry(...playerSettings.size);
    const material = new MeshStandardMaterial({
      color: 'rgba(256, 0, 128, .3)',
      wireframe: false,
      // side: BackSide,
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    this.mesh = mesh;
  }

  update() {}
}

export default PlayerBar;
