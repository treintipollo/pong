var TopLevel = {
	canvas: null,
	context: null,
	container:null,
	lastUpdate: Date.now(),

	player1Score: 0,
	player2Score: 0
};

window.TopLevel = TopLevel;
	
$(function(){
	var frameRequest, mainLoop;

	//This is the main creation function, the game officially starts when this is called.
	var creation = function() {
		TopLevel.canvas    		 = document.getElementById("game");
		TopLevel.context   		 = TopLevel.canvas.getContext("2d");
		TopLevel.container 	     = new ObjectsContainer(TopLevel.context);
		
		ArrowKeyHandler.init();

		//GameObject pooling method
		createObjectPools();
		//All things related to GameObject configuration
		createObjectConfigurations();
		createCollisionPairs();
	
		//This is the game basic logic. It takes care of creating the baddies in the order specified.
		setUpGame();

		//This is the main update loop. It uses requestAnimationFrame 
		setUpGameLoop();
	}

	var setUpGame = function() {	
	
		TopLevel.container.add("Paddle_1");
		TopLevel.container.add("Paddle_2");

		TopLevel.container.add("Top");
		TopLevel.container.add("Left");
		TopLevel.container.add("Right");
		TopLevel.container.add("Bottom");

		TopLevel.container.add("Ball");
	}

	var setUpGameLoop = function() {
		mainLoop = function() {
			var now = Date.now();
			var dt = now - TopLevel.lastUpdate;
			TopLevel.lastUpdate = now;

			if(dt < 30){
				TopLevel.container.update(dt/1000);
				TopLevel.container.draw();
			}
			
			frameRequest = window.requestAnimationFrame(mainLoop);
		}

		var vendors = ['ms', 'moz', 'webkit', 'o'];
		
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame){
			window.requestAnimationFrame = function(callback) {
				return window.setTimeout(callback, 1000 / 60);;
			};
		}

		if (!window.cancelAnimationFrame){
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}

		frameRequest = window.requestAnimationFrame(mainLoop);
	}

	var createObjectPools = function(){
		TopLevel.container.createTypePool("Paddle", Paddle, 2);
		TopLevel.container.createTypePool("Ball"  , Ball  , 1);
		TopLevel.container.createTypePool("Border"  , Border  , 4);
	}

	var createObjectConfigurations = function() {
		var middleLayerIndex = 2;

		TopLevel.container.createTypeConfiguration("Paddle_1", "Paddle", middleLayerIndex).setCollisionId("Paddle").setArgs({x:30, y:TopLevel.canvas.height/2 - 60});
		TopLevel.container.createTypeConfiguration("Paddle_2", "Paddle", middleLayerIndex).setCollisionId("Paddle").setArgs({x:TopLevel.canvas.width-30, y:TopLevel.canvas.height/2 - 60});
		
		TopLevel.container.createTypeConfiguration("Ball", "Ball", middleLayerIndex).setCollisionId("Ball");

		TopLevel.container.createTypeConfiguration("Top", "Border", middleLayerIndex).setCollisionId("Border").setArgs({x:0, y:-10, width:TopLevel.canvas.width, height:10});
		TopLevel.container.createTypeConfiguration("Left", "Border", middleLayerIndex).setCollisionId("Border").setArgs({x:-10, y:0, width:10, height:TopLevel.canvas.height});
		TopLevel.container.createTypeConfiguration("Right", "Border", middleLayerIndex).setCollisionId("Border").setArgs({x:TopLevel.canvas.width, y:0, width:10, height:TopLevel.canvas.height});
		TopLevel.container.createTypeConfiguration("Bottom", "Border", middleLayerIndex).setCollisionId("Border").setArgs({x:0, y:TopLevel.canvas.height, width:TopLevel.canvas.width, height:10});
	}
	
	var createCollisionPairs = function(){
		TopLevel.container.addCollisionPair("Paddle", "Ball");
		TopLevel.container.addCollisionPair("Ball", "Border");		
	}
		
	creation();

});
	
//ArrowKeyHandler.addKeyUpCallback(ArrowKeyHandler.Z, FuntionUtils.bindScope(this, function(){
	//TopLevel.container.add("CargoShip", [100, 100, 10, TopLevel.container]);		
//}));

//ArrowKeyHandler.addKeyUpCallback(ArrowKeyHandler.D, FuntionUtils.bindScope(this, function(){
	//TopLevel.powerUpFactory.create(TopLevel.canvas.width/2-100, TopLevel.canvas.height/2, "MultiWeaponPowerUp", 1, true);
//}));

//ArrowKeyHandler.addKeyUpCallback(ArrowKeyHandler.C, FuntionUtils.bindScope(this, function(){
	//TopLevel.powerUpFactory.create(TopLevel.canvas.width/2+100, TopLevel.canvas.height/2, "MultiWeaponPowerUp", 1, true);
//}));
