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
import { fieldSettings } from '../consts';

class GameBall {
  constructor(scene) {
    this.initBall(scene);
    this.fieldRadius = fieldSettings.sphereSize[0];
    this.speed = { x: 0, y: 0, z: 0 };
    this.naturalForce = { x: 0, y: 0, z: 5 };
    this.defaultAcc = {
      // x: 1,
      // y: 1,
      // z: 1,
      x: (Math.random() - 0.5) * 10.0,
      y: (Math.random() - 0.5) * 10.0,
      z: (Math.random() - 0.5) * 10.0,
    };
    this.position = { x: 0, y: 0, z: 0 };
  }

  initBall(scene) {
    const geometry = new SphereBufferGeometry(6, 32, 32);
    const material = new MeshNormalMaterial({ wireframe: false });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    this.mesh = mesh;
  }

  update = () => {
    const { fieldRadius, naturalForce, defaultAcc, position } = this;
    const {
      geometry: {
        parameters: { radius },
      },
    } = this.mesh;
    const maxFieldRadius = fieldRadius / 2;
    const maxRadius = radius / 2;

    const fps = 60;

    const accX = defaultAcc.x + naturalForce.x;
    const accY = defaultAcc.y + naturalForce.y;
    const accZ = defaultAcc.z + naturalForce.z;

    const time = 1 / fps;
    this.speed.x += accX * 10 * time;
    this.speed.y += accY * 10 * time;
    this.speed.z += accZ * 10 * time;

    this.position.x += time * this.speed.x;
    this.position.y += time * this.speed.y;
    this.position.z += time * this.speed.z;

    if (this.position.x < -maxFieldRadius + maxRadius) {
      this.position.x = -maxFieldRadius + maxRadius;
      this.speed.x *= -1;
      this.naturalForce.x = 1;
    }

    if (this.position.x > maxFieldRadius - maxRadius) {
      this.position.x = maxFieldRadius - maxRadius;
      this.speed.x *= -1;
      this.naturalForce.x = -1;
    }

    if (this.position.y < -maxFieldRadius + maxRadius) {
      this.position.y = -maxFieldRadius + maxRadius;
      this.speed.y *= -1;
      this.naturalForce.y = 1;
    }

    if (this.position.y > maxFieldRadius - maxRadius) {
      this.position.y = maxFieldRadius - maxRadius;
      this.speed.y *= -1;
      this.naturalForce.y = -1;
    }

    if (this.position.z < -maxFieldRadius + maxRadius) {
      this.position.z = -maxFieldRadius + maxRadius;
      this.speed.z *= -1;
      this.naturalForce.z = 1;
    }

    if (this.position.z > maxFieldRadius - maxRadius) {
      this.position.z = maxFieldRadius - maxRadius;
      this.speed.z *= -1;
      this.naturalForce.z = -1;
    }

    // this.mesh.position.set(x, y, z);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  };
}

export default GameBall;
