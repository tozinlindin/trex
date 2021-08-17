var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var gameover, gameoverimagem
var reset,resetimagem
var sommorte,somsalto

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;



function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  gameoverimagem= loadImage ("gameOver.png");
   
  resetimagem=loadImage("restart.png")
  
somsalto=loadSound ("jump.mp3")
  sommorte=loadSound("die.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  
  
   solo.velocityX = -4;  
  
  

    
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
   
  //criar grupos de obstáculos e de nuvens
  grupodeobstaculos = createGroup();
  
  gameover=createSprite(300,100)
  gameover.addImage (gameoverimagem)
 gameover.scale=0.5
 gameover.visible= false
  
  reset=createSprite (300,150)
  reset.addImage (resetimagem)
  reset.scale=0.5
  reset. visible=false
}

function draw() {
  
  background(180);
 
  
    
  
  
  
  
  if(estadoJogo === JOGAR){
   
    
    
    
    //saltar quando a tecla de espaço é pressionada
    if(keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -13;
      somsalto.play ()
  }
    
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
   
    //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();
    
    
    if(grupodeobstaculos.isTouching(trex)){
        estadoJogo = ENCERRAR;
      sommorte.play ()
    }
  }
     
  else if (estadoJogo === ENCERRAR) {
    gameover.visible=true
    reset. visible=true
    
       
     
       
     
      solo.velocityX = 0;
      trex.velocityY = 0
     
      
     //altera a animação do Trex
      trex.changeAnimation("collided", trex_colidiu);  
     
      //define o tempo de vida dos objetos do jogo para que nunca sejam destruídos
    grupodeobstaculos.setLifetimeEach(-1);
     grupodeobstaculos.setVelocityXEach(0);
    if (mousePressedOver(reset)){
    reiniciar()
    }
     }
  
  
  //evita que o Trex caia no solo
  trex.collide(soloinvisivel);

  
  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(400,165,10,40);
  obstaculo.velocityX = -6;
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
   
    
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 134;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    
    
  }
}
function reiniciar (){
  estadoJogo=JOGAR
  gameover.visible=false
  reset.visible=false
  grupodeobstaculos.destroyEach ()
 
}

