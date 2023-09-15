import BaseScene from "./BaseScene";
class ScoreScene extends BaseScene{
    constructor(config){
        super('ScoreScene',{...config,canGoBack:true})
    
}
create(){
    super.create();
    this.getBestScore();
}
getBestScore(){
    const bestScore=localStorage.getItem('bestScore');
    this.add.text(...this.screenCenter,`Best : ${bestScore}`,{fontSize:'36px',fill:'#000'}).setOrigin(0.5,0.5);

}
update(){

}
 }
 export default ScoreScene;
    