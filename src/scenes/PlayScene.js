import BaseScene from "./BaseScene";
const pipeLoop=4;
class PlayScene extends BaseScene{
    constructor(config){
        super('PlayScene',{...config,canGoBack:true});

        this.bird=null;
        this.pipes=null;
        this.pipeSpace=[150,200];
        this.pipeXSpace=[450,500];
        this.pipeX=0;
        this.flapVelocity=300;
        this.score=0;
        this.scoreText='';
        this.flag=0;
        
}
create(){
    super.create();
    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    // this.createPause();
    this.handleInputs();
}
update(){
      this.gameStatus();
      this.recyclePipe();
}
createBG(){
    this.add.image(0,0,'sky').setOrigin(0);
}
createBird(){
    this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,'bird').setOrigin(0);
    this.bird.body.gravity.y=600;
    this.bird.setCollideWorldBounds(true);
}
createPipes(){
    this.pipes=this.physics.add.group();
    for(let i=0;i<pipeLoop;i++)
    {
      const pipe=this.pipes.create(0,0,'pipe')
      .setImmovable(true)
      .setOrigin(0,1);
      const lowpipe=this.pipes.create(0,0,'pipe').setOrigin(0,0);
      this.placePipe(pipe,lowpipe);
    }
    this.pipes.setVelocityX(-200);
}
createColliders(){
    this.physics.add.collider(this.bird,this.pipes,this.restartPlay,null,this);

}
createScore(){
    this.score=0;
    const bestScore=localStorage.getItem('bestScore')
    this.scoreText=this.add.text(16,16,`Score: ${0}`,{fontSize:'32px',fill:'#000'});
    this.add.text(16,50,`Best : ${bestScore}`,{fontSize:'18px',fill:'#000'})
}
handleInputs(){
    this.input.on('pointerdown',this.flap,this);
    this.input.keyboard.on('keydown-SPACE',this.flap,this);
}
// createPause(){
//     const pauseButton=this.add.image(780,570,'pause')
//     .setInteractive()
//     .setScale(3)
//     .setOrigin(1);

//     pauseButton.on('pointerdown',() => {
//         this.physics.pause();
//         this.scene.pause();
      
//     })
// }
gameStatus(){
    if(this.bird.getBounds().bottom>=this.config.height || this.bird.y<=0){
        this.restartPlay();
      }
}

flap(){
    this.bird.body.velocity.y=-this.flapVelocity;
}
increaseScore(){
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`)
}
placePipe(uPipe,lPipe){
    // pipeX+=400;
    const rightmostX=this.getRightPipe();
    const pipeDist=Phaser.Math.Between(...this.pipeSpace);
    const pipeY=Phaser.Math.Between(0+20,this.config.height-20-pipeDist);
    const pipeX=Phaser.Math.Between(...this.pipeXSpace);
    uPipe.x=rightmostX+pipeX;
    uPipe.y=pipeY;
  
    lPipe.x=uPipe.x;
    lPipe.y=uPipe.y+pipeDist;
  }
  
 recyclePipe(){
    const tempPipes=[];
    this.pipes.getChildren().forEach(pipe=>{
      if(pipe.getBounds().right<=0){
        //recycle the pipe
        tempPipes.push(pipe);
        if(tempPipes.length==2){
          this.placePipe(...tempPipes);
          this.increaseScore();
        }
      }
    })
  }
  getRightPipe(){
    let rightmostX=0;
    this.pipes.getChildren().forEach(function(pipe){
      rightmostX=Math.max(pipe.x,rightmostX);
    })
    return rightmostX;
  }
   restartPlay(){
    this.physics.pause();
    this.bird.setTint(0xE7401D);
    const bestScoreText=localStorage.getItem('bestScore');
    const bestScore=this.bestScoreText&&parseInt(this.bestScoreText,10);
    if(!bestScore || bestScore<this.score){
        localStorage.setItem('bestScore',this.score);
    }
    this.time.addEvent({
        delay:1000,
        callback:()=>{
            this.scene.restart();
        },
        loop:false
    })
  }

}
export default PlayScene;