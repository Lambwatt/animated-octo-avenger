/*window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
	})();*/

var patch = {"width":96, "height":164, "frames":[
	[{"name":"leg1", "img":"leg", "x":71, "y":100, "width":32, "height":64},
	{"name":"leg2","img":"leg", "x":25, "y":80, "width":32, "height":64},
	{"name":"torso","img":"torso", "x":16, "y":16, "width":96, "height":96}],

	[{"name":"leg1","img":"leg", "x":71, "y":80, "width":32, "height":64},
	{"name":"leg2","img":"leg", "x":25, "y":100, "width":32, "height":64},
	{"name":"torso","img":"torso", "x":16, "y":16, "width":96, "height":96}]]}


//Frame rendering function
function drawFrame(canvas_context, frameNum, x, y, width, height){
	
	//get layers for a frame and set width and height if they are not provided.
	var patchLayers = patch.frames[frameNum];
	if(width!=null && height!=null){
		var widthRatio = width/patch.width;
		var heightRatio = height/patch.height;
	}
	else{
		var widthRatio = 1;
		var heightRatio = 1;
	}
	
	//draw each layer
	for(var l = 0; l< patchLayers.length; l++){
		canvas_context.drawImage(document.getElementById(patchLayers[l].img), 
			(patchLayers[l].x*widthRatio)+x, 
			(patchLayers[l].y*heightRatio)+y,
			patchLayers[l].width * widthRatio,
			patchLayers[l].height * heightRatio);

		//if selected, show selection highlighting
		if(l == canvas_selection_index){
			canvas_context.lineWidth = 5;
			canvas_context.strokeStyle = "rgb(100,200,100)";//Make thicker and more apparent	
			canvas_context.strokeRect(
				(patchLayers[l].x*widthRatio)+x, 
				(patchLayers[l].y*heightRatio)+y,
				patchLayers[l].width * widthRatio,
				patchLayers[l].height * heightRatio);
			canvas_context.lineWidth = 1;
		}		
	}
}
