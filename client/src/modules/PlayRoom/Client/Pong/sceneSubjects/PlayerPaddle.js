import { CylinderBufferGeometry, MeshStandardMaterial, Mesh } from 'three';
import { playerSettings } from '../consts';

class PlayerPaddle {
  constructor(scene) {
    const geometry = new CylinderBufferGeometry(...playerSettings.paddleSize);
    const material = new MeshStandardMaterial({
      color: 'rgba(256, 0, 128, .3)',
      wireframe: false,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    this.mesh = mesh;
  }
}

export default PlayerPaddle;
