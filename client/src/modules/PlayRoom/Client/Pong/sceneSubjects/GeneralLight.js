import { PointLight, PointLightHelper } from 'three';

class GeneralLight {
  constructor(scene) {
    this.light = new PointLight('#22f', 6);
    this.light.position.set(5, 5, 5);

    scene.add(this.light);

    const sphereSize = 1;
    const pointLightHelper = new PointLightHelper(
      this.light,
      sphereSize,
      '0xffffff'
    );
    scene.add(pointLightHelper);
  }

  update = time => {
    this.light.intensity = (Math.sin(time) + 1.5) / 1.5;
    this.light.color.setHSL(Math.sin(time), 0.5, 0.5);
  };
}

export default GeneralLight;
