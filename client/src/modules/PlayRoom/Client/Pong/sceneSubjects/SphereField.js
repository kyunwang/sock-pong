import {
  Mesh,
  MeshStandardMaterial,
  MeshNormalMaterial,
  DoubleSide,
  FrontSide,
  BackSide,
  SphereGeometry,
  MeshLambertMaterial,
} from 'three';

import random from 'canvas-sketch-util/random';
import { fieldSettings } from '../consts';

class SphereField {
  constructor(scene) {
    const geometry = new SphereGeometry(...fieldSettings.sphereSize);
    const material = new MeshNormalMaterial({
      flatShading: false,
      side: DoubleSide,
      wireframe: true,
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    this.mesh = mesh;
  }
}

export default SphereField;
