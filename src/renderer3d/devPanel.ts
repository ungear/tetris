import * as dat from "dat.gui";
import * as Config from "./config";

export const DevelopmentConfigs = {
  pointLightX: Config.PointLightInitialValues.x,
  pointLightY: Config.PointLightInitialValues.y,
  pointLightZ: Config.PointLightInitialValues.z,
  color1: 0xaaffaa
}

export class DevPanel {
  params = DevelopmentConfigs;
  constructor(){
    const gui = new dat.GUI();
    gui.add(this.params, 'pointLightX').min(-500).max(500);
    gui.add(this.params, 'pointLightY').min(-500).max(500);
    gui.add(this.params, 'pointLightZ').min(-500).max(500);
    gui.addColor(this.params, 'color1');
  }
}