import Phaser from "phaser";

class BaseScene extends Phaser.Scene{
    constructor(key,config){
        super(key)
        this.config=config;
        this.screenCenter=[config.width/2,config.height/2];

    }
    create(){
        this.createBG();
        if(this.config.canGoBack){
            const backButton=this.add.image(700,570,'back')
            .setInteractive()
            .setScale(2)
            backButton.on('pointerdown',() => {
                this.scene.start('MenuScene');
            })
        }
    }
    createBG(){
        this.add.image(0,0,'sky').setOrigin(0);
    }
    createMenu(menu,setMenuEvent){
        let lastMenuY=0;
        menu.forEach(menuItem => {
            const menuPosition=[this.screenCenter[0],this.screenCenter[1]+lastMenuY];
            menuItem.textGO=this.add.text(...menuPosition,menuItem.text,{fontSize:'32px',fill:'#ffffFF'}).setOrigin(0.5,1);
            lastMenuY+=42;
            setMenuEvent(menuItem);
        });
    }
    

}
export default BaseScene;