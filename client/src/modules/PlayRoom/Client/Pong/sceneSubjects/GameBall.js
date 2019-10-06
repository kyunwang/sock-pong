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
import { collisionCylinderSphere, collisionSphereSphere } from '../helpers';

class GameBall {
  constructor(scene) {
    this.initBall(scene);
    this.fieldRadius = fieldSettings.sphereSize[0];
    this.speed = { x: 0, y: 0, z: 0 };
    this.naturalForce = { x: 0, y: 0, z: 0 };
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

  checkPlayerCollision(playerOne, playerTwo) {
    // TODO: Think about need to add a check regarding radius , as paddles are only on the edge of the field
    const hasCollidedPlayerOne = collisionCylinderSphere(
      playerOne.mesh,
      this.mesh
    );
    if (hasCollidedPlayerOne) {
      console.log('Collided player one');

      return;
    } else if (collisionCylinderSphere(playerTwo.mesh, this.mesh)) {
      // No variable to prevent unneeded calculation
      console.log('Collided player two');
    }
  }

  checkWallCollision() {
    // TODO: think about need to checkspheresphrere collision to prevent all the if checks
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
  }

  update = (playerOne, playerTwo) => {
    this.checkWallCollision();
    this.checkPlayerCollision(playerOne, playerTwo);
  };
}

export default GameBall;
