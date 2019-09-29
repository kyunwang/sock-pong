import {
  CylinderBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  Quaternion,
  Vector3,
} from 'three';
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

  update(time) {
    // this.mesh.position.x = Math.cos(time * 10) * 5;
    // this.mesh.position.y = Math.cos(time * 10) * 5;
    // this.mesh.position.z = Math.cos(time * 10) * 5;
  }
}

export default PlayerPaddle;
