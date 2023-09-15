import Phaser from "phaser";
import MenuScene from "./MenuScene";


class PreloadScene extends Phaser.Scene{
    constructor(){
        super('PreloadScene')
    }
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird','assets/bird.png');
        this.load.image('pipe','assets/pipe.png');
        // this.load.image('pause','assets/pause.png');
        this.load.image('back','assets/back.png')
    }
    create(){
        this.scene.start('MenuScene');
    }

    update(){
    }

}
export default PreloadScene;