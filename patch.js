/*window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
	})();*/

var patch = {"width":96, "height":164, "frames":[
	[{"img":document.getElementById("leg"), "x":71, "y":100, "width":32, "height":64},
	{"img":document.getElementById("leg"), "x":25, "y":80, "width":32, "height":64},
	{"img":document.getElementById("torso"), "x":16, "y":16, "width":96, "height":96}],

	[{"img":document.getElementById("leg"), "x":71, "y":80, "width":32, "height":64},
	{"img":document.getElementById("leg"), "x":25, "y":100, "width":32, "height":64},
	{"img":document.getElementById("torso"), "x":16, "y":16, "width":96, "height":96}]]}

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
	console.log(widthRatio+", "+heightRatio);
	
	for(var l in patchLayers){
		console.log(patchLayers[l].img);
		
		context.drawImage(patchLayers[l].img, 
			(patchLayers[l].x*widthRatio)+x, 
			(patchLayers[l].y*heightRatio)+y,
			patchLayers[l].width * widthRatio,
			patchLayers[l].height * heightRatio);
	}
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var frame = 0;

setInterval(function() {
		console.log("frame = "+frame);
		context.clearRect(0 , 0 , canvas.width, canvas.height); 
    drawFrame(context, frame, 0, 0, 96, 164);
		frame = (++frame)%(patch.frames.length);
		document.getElementById("layerFeild").type = "hidden";
	},1300);


function submitLayerName(){
	console.log("pressed enter");
	console.log("layer name received = "+document.getElementById("layerFeild").value);
}
