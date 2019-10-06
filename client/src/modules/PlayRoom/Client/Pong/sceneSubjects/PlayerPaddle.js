// Source circular rotation: https://blender.stackexchange.com/a/3477

import {
  CylinderBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  Quaternion,
  Vector3,
} from 'three';
import { fieldSettings, playerSettings } from '../consts';

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

  update(t) {
    const time = t / 10;

    // this.mesh.position.x = Math.cos(time * 10) * 5;
    // this.mesh.position.y = Math.cos(time * 10) * 5;
    // this.mesh.position.z = Math.cos(time * 10) * 5;

    this.mesh.position.x =
      fieldSettings.size[0] * Math.cos(time * (2 * Math.PI));
    this.mesh.position.y =
      fieldSettings.size[0] * Math.sin(time * (2 * Math.PI));

    // Rotation ? xyz? should change based on the radius and positions x,y to look at the center
    // Or center === 0

    // rotate on x & z

    // this.mesh.rotation.z =
    //   fieldSettings.size[0] * Math.tan(time * (2 * Math.PI));
    // this.mesh.rotation.z =
    // Math.atan2(this.mesh.position.y, this.mesh.position.x) + Math.PI / 2;
    // this.mesh.rotation.z = Math.cos(time * (2 * Math.PI));
    // this.mesh.rotation.y = Math.sin(time * (2 * Math.PI));
    // console.log(this.mesh.rotation.z);
    // console.log(this.mesh.position.x);
    // console.log(Math.cos(time * (2 * Math.PI)));

    // Math.atan2(this.mesh.position.y, this.mesh.position.x) + Math.PI / 2;

    // console.log(fieldSettings.size[0] * Math.cos(time * (2 * Math.PI)));
  }
}

export default PlayerPaddle;
