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
	
	for(var l = 0; l< patchLayers.length; l++){
/*		console.log(patchLayers);
		console.log("drawing layer "+l);
		console.log(patchLayers[l].img);

		console.log("img = "+patchLayers[l].img);
*/	context.drawImage(document.getElementById(patchLayers[l].img), 
			(patchLayers[l].x*widthRatio)+x, 
			(patchLayers[l].y*heightRatio)+y,
			patchLayers[l].width * widthRatio,
			patchLayers[l].height * heightRatio);

		if(l == canvas_selection_index){
			context.strokeStyle = "rgb(100,200,100)";	
			context.strokeRect(
				(patchLayers[l].x*widthRatio)+x, 
				(patchLayers[l].y*heightRatio)+y,
				patchLayers[l].width * widthRatio,
				patchLayers[l].height * heightRatio);

		}		
	}
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var layersCanvas = document.getElementById("layersAndFrames");
var layersContext = layersCanvas.getContext("2d");

var frame = 0;
var selectedLayer = "";
var renderCount = 0;
var selected_layer_index = -1;

var drop_index = -2;
var drop_index_width = 20;
var dragging = false;

var layer_selection_x = 0;
var layer_selection_x_offset = 0;
var layer_selection_y = 0;
var layer_selection_y_offset = 0;

var canvas_drag = false;
var canvas_selection_index = -1;
var canvas_selection_x_offset = 0;
var canvas_selection_y_offset = 0;

setInterval(function() {
		//console.log("frame = "+frame);
		context.clearRect(0 , 0 , canvas.width, canvas.height); 
    drawFrame(context, frame, 0, 0, 96, 164);
		if(playing && renderCount==0){ 
			frame = (++frame)%(patch.frames.length);
			document.getElementById("frameNum").innerHTML = frame;
		}
		renderCount = (++renderCount)%34;
		document.getElementById("layerFeild").type = "hidden";
		drawLayers(frame);
	},30);

layersContext.font="32px Courier New";

function drawLayers(frameNum){

	layersContext.clearRect(0 , 0 , canvas.width, canvas.height);
	
	var y = 30;

	var patchLayers = patch.frames[frameNum];
	var numLayers = patchLayers.length;
	//var placed_index = false;

	for(var i = numLayers-1; i>=0; i--){
		if(drop_index > selected_layer_index){
			if(i==drop_index){// && drop_index<selected_layer_index)|| (i==drop_index+1 && drop_index>=selected_layer_index)){
				layersContext.fillStyle = "rgb(100,100,200)";
				layersContext.fillRect(15,y-10,1000,10);

				y+=20;
			}
		}else{
			if(i==drop_index-1){// && drop_index<selected_layer_index)|| (i==drop_index+1 && drop_index>=selected_layer_index)){
				layersContext.fillStyle = "rgb(100,100,200)";
				layersContext.fillRect(15,y-10,1000,10);

				y+=20;
			}

		}

		if(i == selected_layer_index){
			if(dragging) continue;
			layersContext.fillStyle = "rgb(100,100,200)";
			layersContext.fillRect(10,y-23,1005,30);	
		}	
		layersContext.strokeStyle = "rgb(0,0,0)";
		layersContext.strokeRect(10,y-23,1005,30);
		layersContext.fillStyle = "rgb(0,0,0)";	
		layersContext.fillText(patchLayers[i].name,20,y,1000);

		y+=30;
		
	}

	if(drop_index > selected_layer_index){
		if(i==drop_index){			layersContext.fillStyle = "rgb(100,100,200)";
			layersContext.fillRect(15,y-10,1000,10);
		}
	}else{
		if(i==drop_index-1){			layersContext.fillStyle = "rgb(100,100,200)";
			layersContext.fillRect(15,y-10,1000,10);
		}
	}

	if(dragging){

		layersContext.fillStyle = "rgb(100,100,200)";
		layersContext.fillRect(layer_selection_x,layer_selection_y,1005,30);			

		layersContext.strokeRect(layer_selection_x,layer_selection_y,1005,30);
		layersContext.fillStyle = "rgb(0,0,0)";	
		layersContext.fillText(patchLayers[selected_layer_index].name,layer_selection_x+10,layer_selection_y+23,1000);

	}
}

function addFrame(){
	var length = patch.frames.length;
	var newFrame = new Array();
	for(var i in patch.frames[length - 1]){
		var newLayer = new Object();
		console.log("layer copied = "+i);
		for(var v in patch.frames[length - 1][i]){
			var newVal= patch.frames[length - 1][i][v];
			console.log("object copied = "+o+" with value "+newVal);
			
			newLayer[v] = newVal;
		}
		newFrame[i] = newLayer;
	}
	
	//console.log(newFrame)
	patch.frames[length] = newFrame;//;*/
	console.log(patch.frames[length]);

	
	//patch.frames[length] = JSON.parse(test)

	
}

function nextFrame(){
	frame = (++frame)%(patch.frames.length);
	document.getElementById("frameNum").innerHTML = frame;

}

function previousFrame(){
	console.log("frame before = "+frame);
	frame = ((--frame) + patch.frames.length) % patch.frames.length;
	document.getElementById("frameNum").innerHTML = frame;
	console.log("frame after = "+frame);
}

function submitLayerName(){
	console.log("pressed enter");
	console.log("layer name received = "+document.getElementById("layerFeild").value);
}

function printPatch(){
	var string = JSON.stringify(patch);
	document.getElementById("output").innerHTML = string;

}

var playing = false;

function togglePlay(){
	playing = !playing;
	if(playing){
		document.getElementById("nextFrame").style.visibility="hidden";
		document.getElementById("previousFrame").style.visibility="hidden";
		document.getElementById("pausePlay").innerHTML = "pause";
	}else{
		document.getElementById("nextFrame").style.visibility="visible";
		document.getElementById("previousFrame").style.visibility="visible";
		document.getElementById("pausePlay").innerHTML = "play";
	}
	
}

function processLayerMouseClick(click_x, click_y){

	var y = 30;
	dragging  = false;

	var patchLayers = patch.frames[frame];
	var numLayers = patchLayers.length;
	clearSelectedLayer();
	for(var i = numLayers-1; i>=0; i--){
		if(click_x>10 && click_x<1005 && click_y>y-23 && click_y<y+7){
			selectLayer(i);
			setLayerSelectionOffsets(10, y-23, click_x, click_y);
			dragging = true;
			drop_index = i;
		}
		//layersContext.strokeRect(10,y-23,1005,30);
		//layersContext.fillText(patchLayers[i].name,20,y,1000);
		y+=30;
	}
	
}

function selectLayer(layerNum){
	//selectedLayer = patch.frames[frame][layerNum].name;
	selected_layer_index = layerNum;
}

function clearSelectedLayer(){
	console.log("cleared");
	selected_layer_index = null;
}

function setLayerSelectionOffsets(x, y, click_x, click_y){
	layer_selection_x = x;
	layer_selection_x_offset = x - click_x;
	layer_selection_y = y;
	layer_selection_y_offset = y - click_y;
}

//Layer control events

layersCanvas.addEventListener("mousedown", function(e){
    var click_x = e.pageX - this.offsetLeft;
    var click_y = e.pageY - this.offsetTop;
    if(click_x>=0 && click_x<layersCanvas.width && click_y>=0 && click_y<layersCanvas.height)
    {
        processLayerMouseClick(click_x, click_y);
    }
});

layersCanvas.addEventListener("mousemove", function(e){

    var mouse_x = e.pageX - this.offsetLeft;
    var mouse_y = e.pageY - this.offsetTop;

		//set selection coords
		layer_selection_x = mouse_x + layer_selection_x_offset;
		layer_selection_y = mouse_y + layer_selection_y_offset;

		//set drop index

		if(dragging){
			console.log(((drop_index*30)+30)+":"+layer_selection_y+":"+((drop_index*30)+50));
	
			if((layer_selection_y<((drop_index*30)) || layer_selection_y>((drop_index*30)+50))){
				var y_from_top = 30
				var layers = patch.frames[frame]
				console.log("triggered");
				drop_index = 0;
				for(var i = layers.length-1; i >= 0; i--){
				//	console.log("potential boundary "+y_from_top);
					if(layer_selection_y<y_from_top){
						drop_index = i;
						break;
					}
					y_from_top+=30;
				}
				
								
				//console.log("new drop index = "+drop_index);
			}
		}	
			
 });

layersCanvas.addEventListener("mouseup", function(e){
  if(dragging){
		console.log("released mouse");
		dragging = false;

		//Place layer
		var newLayersArrangement = [];
		//var temp = null;
		
		console.log("dropping at index"+drop_index);

		for(var i = 0; i<patch.frames[frame].length; i++){
	
			if(drop_index>selected_layer_index){
				if(i!=selected_layer_index) 
					newLayersArrangement.push(patch.frames[frame][i]);
				if(i==drop_index){
				 	newLayersArrangement.push(patch.frames[frame][selected_layer_index]);
					//console.log("dropped at "+i);
					//selectLayer(newLayersArrangement.length);
				}
			}else{
				if(i==drop_index){
				 	newLayersArrangement.push(patch.frames[frame][selected_layer_index]);
					//console.log("dropped at "+i);
					//selectLayer(newLayersArrangement.length);
				}
				if(i!=selected_layer_index) 
					newLayersArrangement.push(patch.frames[frame][i]);
			}
		}

		//selectLayer(drop_index);
		patch.frames[frame] = newLayersArrangement;
		clearSelectedLayer();
		//var temp = patch.frames[frame][drop_index];
		
		
		//patch.frames[frame][drop_index] =;
		

		drop_index = -2;
	}
});

function processCanvasMouseClick(click_x, click_y){
	var hit = false;
	console.log("falsified");
	for(var i in patch.frames[frame]){
		var target =  patch.frames[frame][i];
		console.log("click at ["+click_x+","+click_y+"]. x = "+target.x+" x+w"+ (target.x + target.width)+" y = "+ target.y +" y+h"+ (target.y + target.height) )
		if(click_x > target.x && click_x < target.x + target.width && click_y > target.y && click_y < target.y + target.height){

			hit = true;
			
			console.log("canvasSelectionIndex = "+canvas_selection_index);
			if(canvas_selection_index == i){
				console.log("startDrag");
				canvas_drag = true;
			}
			else
			{
				console.log("set to "+i);
				canvas_selection_index = i;
				canvas_selection_x_offset = target.x - click_x;
				canvas_selection_y_offset = target.y - click_y;
			}
		}
		
	}

	console.log("hit?"+hit);
	if(!hit){
		console.log("nullified");
		canvas_selection_index = null;
		canvas_selection_x_offset = 0;
		canvas_selection_y_offset = 0;
	}

}

canvas.addEventListener("mousedown", function(e){
    var click_x = e.pageX - this.offsetLeft;
    var click_y = e.pageY - this.offsetTop;
    if(click_x>=0 && click_x<layersCanvas.width && click_y>=0 && click_y<layersCanvas.height)
    {
        processCanvasMouseClick(click_x, click_y);
    }
});

canvas.addEventListener("mousemove", function(e){

		if(canvas_drag){
   	 var mouse_x = e.pageX - this.offsetLeft;
   	 var mouse_y = e.pageY - this.offsetTop;
	
			//set selection coords
			console.log("selectionAtDragTime = "+canvas_selection_index);
			patch.frames[frame][canvas_selection_index].x = mouse_x + canvas_selection_x_offset;
			patch.frames[frame][canvas_selection_index].y = mouse_y + canvas_selection_y_offset;
		}

});

canvas.addEventListener("mouseup", function(e){
	
	canvas_drag = false;
});
