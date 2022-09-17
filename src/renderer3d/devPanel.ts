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
    gui.add(this.params, 'pointLightX').min(this.params.pointLightX-500).max(this.params.pointLightX+500);
    gui.add(this.params, 'pointLightY').min(this.params.pointLightY-500).max(this.params.pointLightY+500);
    gui.add(this.params, 'pointLightZ').min(this.params.pointLightZ-500).max(this.params.pointLightZ+500);
    gui.addColor(this.params, 'color1');
  }
}