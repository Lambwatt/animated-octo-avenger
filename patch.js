var layers = [{"img":document.getElementById("leg"), "x":71, "y":100, "width":32, "height":64},{"img":document.getElementById("leg"), "x":25, "y":100, "width":32, "height":64},{"img":document.getElementById("torso"), "x":16, "y":16, "width":96, "height":96}]

var patch = {"width":96, "height":164, "frames":[[{"img":document.getElementById("leg"), "x":71, "y":100, "width":32, "height":64},{"img":document.getElementById("leg"), "x":25, "y":100, "width":32, "height":64},{"img":document.getElementById("torso"), "x":16, "y":16, "width":96, "height":96}],[{"img":document.getElementById("leg"), "x":71, "y":100, "width":32, "height":64},{"img":document.getElementById("leg"), "x":25, "y":500, "width":32, "height":64},{"img":document.getElementById("torso"), "x":16, "y":16, "width":96, "height":96}]]}

function drawFrame(context, frameNum, x, y, width, height){
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

drawFrame(context, 0, 0, 0, 96, 164);
