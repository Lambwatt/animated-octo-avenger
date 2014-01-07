/*window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
	})();*/

var patch = {"width":96, "height":164, "frames":[
	[{"name":"leg1", "img":document.getElementById("leg"), "x":71, "y":100, "width":32, "height":64},
	{"name":"leg2","img":document.getElementById("leg"), "x":25, "y":80, "width":32, "height":64},
	{"name":"torso","img":document.getElementById("torso"), "x":16, "y":16, "width":96, "height":96}],

	[{"name":"leg1","img":document.getElementById("leg"), "x":71, "y":80, "width":32, "height":64},
	{"name":"leg2","img":document.getElementById("leg"), "x":25, "y":100, "width":32, "height":64},
	{"name":"torso","img":document.getElementById("torso"), "x":16, "y":16, "width":96, "height":96}]]}

function drawFrame(context, frameNum, x, y, width, height){
	//console.log("who ie calling me?");
	var patchLayers = patch.frames[frameNum];
	if(width!=null && height!=null){
		var widthRatio = width/patch.width;
		var heightRatio = height/patch.height;
	}
	else{
		var widthRatio = 1;
		var heightRatio = 1;
	}
	//console.log(widthRatio+", "+heightRatio);
	
	for(var l in patchLayers){
		//console.log(patchLayers[l].img);
		
		context.drawImage(patchLayers[l].img, 
			(patchLayers[l].x*widthRatio)+x, 
			(patchLayers[l].y*heightRatio)+y,
			patchLayers[l].width * widthRatio,
			patchLayers[l].height * heightRatio);
	}
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var layersCanvas = document.getElementById("layersAndFrames");
var layersContext = layersCanvas.getContext("2d");

var frame = 0;

setInterval(function() {
		//console.log("frame = "+frame);
		context.clearRect(0 , 0 , canvas.width, canvas.height); 
    drawFrame(context, frame, 0, 0, 96, 164);
		if(playing) frame = (++frame)%(patch.frames.length);
		document.getElementById("layerFeild").type = "hidden";
		drawLayers(frame);
	},1000);

layersContext.font="32px Courier New";

function drawLayers(frameNum){

	var y = 30;

	var patchLayers = patch.frames[frameNum];
	var numLayers = patchLayers.length;
	for(var i = numLayers-1; i>=0; i--){
		layersContext.strokeRect(10,y-23,1005,30);
		layersContext.fillText(patchLayers[i].name,20,y,1000);
		y+=30;
	}
}

function nextFrame(){
	frame = (++frame)%(patch.frames.length);
}

function previousFrame(){
	console.log("frame before = "+frame);
	frame = ((--frame) + patch.frames.length) % patch.frames.length;
	console.log("frame after = "+frame);
}

function submitLayerName(){
	console.log("pressed enter");
	console.log("layer name received = "+document.getElementById("layerFeild").value);
}

var playing = false;

function togglePlay(){
	playing = !playing;
	if(playing){
		document.getElementById("pausePlay").innerHTML = "pause";
	}else{
		document.getElementById("pausePlay").innerHTML = "play";
	}
}
