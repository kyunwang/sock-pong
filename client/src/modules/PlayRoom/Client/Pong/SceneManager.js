import {
  Clock,
  Scene,
  Color,
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshLambertMaterial,
} from 'three';
import GeneralLight from './sceneSubjects/GeneralLight';

class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.clock = new Clock();

    this.screenDimensions = {
      height: (canvas.height = canvas.offsetHeight),
      width: (canvas.width = canvas.offsetWidth),
    };

    this.scene = this.buildScene();
    this.renderer = this.buildRenderer(this.screenDimensions);
    this.camera = this.buildCamera(this.screenDimensions);
  }

  buildScene() {
    const newScene = new Scene();
    newScene.background = new Color('#000');
    return newScene;
  }

  buildRenderer({ height, width }) {
    const newRenderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    newRenderer.shadowMap.enabled = true;
    // newRenderer.shadowMap.autoUpdate = false; // depends
    newRenderer.setClearColor(0x000000, 0);
    newRenderer.setPixelRatio(DPR);
    newRenderer.setSize(width, height);

    // newRenderer.gammaInput = true;
    // newRenderer.gammeOutput = true;

    return newRenderer;
  }

  buildCamera({ height, width }) {
    const FOV = 75;
    const aspectRatio = width / height;
    const nearPlane = 0.1;
    const farPlane = 10000;
    const newCamera = new PerspectiveCamera(
      FOV,
      aspectRatio,
      nearPlane,
      farPlane
    );

    return newCamera;
  }

  buildCube = () => {
    const geo = new BoxGeometry(1, 1, 1);
    // const mat = new MeshBasicMaterial({ color: 0x00ff00 });
    const mat = new MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geo, mat);

    this.scene.add(cube);

    return cube;
  };

  addLight = () => {
    const light = new GeneralLight(this.scene);
  };
}

export default SceneManager;
