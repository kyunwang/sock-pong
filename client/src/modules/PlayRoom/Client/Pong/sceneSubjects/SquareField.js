import {
  Mesh,
  MeshStandardMaterial,
  MeshNormalMaterial,
  BoxGeometry,
  DoubleSide,
  BackSide,
} from 'three';
import { fieldSettings } from '../consts';

class SquareField {
  constructor(scene) {
    const geometry = new BoxGeometry(...fieldSettings.size);
    const material = new MeshNormalMaterial({
      color: 'red',
      side: BackSide,
      flatShading: false,
      wireframe: false,
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    this.mesh = mesh;
  }

  update = time => {
    if (!time) return;

    const { geometry } = this.mesh;

    geometry.verticesNeedUpdate = true;
    geometry.computeVertexNormals();
    geometry.normalsNeedUpdate = true;
  };

  // updateField = (preset) => {}
}

export default SquareField;
