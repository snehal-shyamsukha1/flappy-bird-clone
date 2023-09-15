import BaseScene from './BaseScene';

class MenuScene extends BaseScene{
    constructor(config){
        super('MenuScene',config)
        this.menu=[
            {scene: 'PlayScene',text:'Play'},
            {scene: 'ScoreScene',text:'Score'},
            {scene:null,text:'Exit'}
        ]
        this.setMenuEvent = this.setMenuEvent.bind(this);
    }
    create(){
       super.create(); 
       this.createMenu(this.menu,this.setMenuEvent);
    }
    setMenuEvent(menuItem){
        const textGO=menuItem.textGO;
        textGO.setInteractive();
        textGO.on('pointerover',()=>{
            textGO.setStyle({fill:'#ff0'})
        })
        textGO.on('pointerout',()=>{
            textGO.setStyle({fill:'#fff'})
        })
        textGO.on('pointerdown',()=>{
            menuItem.scene && this.scene.start(menuItem.scene);

            if(menuItem.text==='Exit'){
                this.game.destroy(true);
            }
        })
    }
    update(){

    }

}
export default MenuScene;