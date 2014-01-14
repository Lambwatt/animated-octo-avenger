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
			canvas_context.strokeStyle = "rgb(100,200,100)";//Make thicker and more apparent	
			canvas_context.strokeRect(
				(patchLayers[l].x*widthRatio)+x, 
				(patchLayers[l].y*heightRatio)+y,
				patchLayers[l].width * widthRatio,
				patchLayers[l].height * heightRatio);
		}		
	}
}

//assign canvas
var canvas = document.getElementById("canvas");
var canvas_context = canvas.getContext("2d");

//assign layerCanvas (where the layers/frame will sit.) //consider renaming to timeline canvas
var timeline_canvas = document.getElementById("timeline_canvas");
var timeline_context = timeline_canvas.getContext("2d");

//initialize global variables
var frame = 0;									//displayed frame /control
var playing = false;						//are the frames playing automatically, disable frame editing if so.
var interval_count = 0; 						//used to control frame rate //control

var timeline_drop_index_height = 20;			//width of the drop index line //Aesthetic
var timeline_drop_index = -2;						//index into which dragged layer will be dropped //control
var timeline_drag = false; 					//should selected component follow mouse movement // conrol //rename to refer to layer/timeline

var timeline_selection_index = -1; 	//index of selected layer //control
var timeline_selection_x = 0;				//x of selected layer box 
var timeline_selection_x_offset = 0; //x difference between selected layer box and mouse
var timeline_selection_y = 0;				//y of selected layer box 
var timeline_selection_y_offset = 0;	//y difference between selected layer box and mouse

var canvas_drag = false;						//should canvas item selcted follow mouse 
var canvas_selection_index = -1; 		//canvas object selected in this frame
var canvas_selection_x_offset = 0;	//x difference between selected object on canvas and mouse
var canvas_selection_y_offset = 0;	//y difference between selected object on canvas and mouse

timeline_context.font="32px Courier New";	//Layer display font

var intervalsPerFrame = 24;
var x = document.getElementById("intPerFram").value;
console.log("x = "+x);

//set refresh interval for all screens. function runs all rendering //consider splitting up
setInterval(function() {
		//clear canvas
		canvas_context.clearRect(0 , 0 , canvas.width, canvas.height);

		//draw frame in canvas
    drawFrame(canvas_context, frame, 0, 0, 96, 164);

		//Slows frame rate from intended 30 fps
		if(playing && interval_count==0){ 
			frame = (++frame)%(patch.frames.length);
			document.getElementById("frameNum").innerHTML = frame;
		}
		interval_count = (++interval_count)%intervalsPerFrame;
		
		document.getElementById("layerFeild").type = "hidden";//retrieve layer name if given //might be a relic of abandoned functionality

		//draw layers section
		drawLayers(frame);
	},30);

//need to fix this
function submitIntervalsPerFrame(){
	var val =  parseInt(document.getElementById("intPerFram").value);
	console.log("val vs number is = "+(typeof val));
	if( (typeof val) == 'number' ){
		intervalsPerFrame = Math.abs(Math.floor(val));
		console.log("val accepted");
	}else{
		document.getElementById("intPerFram").style.value = intervalsPerFrame;
		console.log("val rejected");
	}
}

//layer rendering function
function drawLayers(frameNum){

	timeline_context.clearRect(0 , 0 , canvas.width, canvas.height);
	
	var y = 30;

	var patchLayers = patch.frames[frameNum];
	var numLayers = patchLayers.length;
	
	for(var i = numLayers-1; i>=0; i--){
		if(timeline_drop_index > timeline_selection_index){
			if(i==timeline_drop_index){
				timeline_context.fillStyle = "rgb(100,100,200)";
				timeline_context.fillRect(15,y-10,1000,10);

				y+=20;
			}
		}else{
			if(i==timeline_drop_index-1){
				timeline_context.fillStyle = "rgb(100,100,200)";
				timeline_context.fillRect(15,y-10,1000,10);

				y+=20;
			}

		}

		if(i == timeline_selection_index){
			if(timeline_drag) continue;
			timeline_context.fillStyle = "rgb(100,100,200)";
			timeline_context.fillRect(10,y-23,1005,30);	
		}	
		timeline_context.strokeStyle = "rgb(0,0,0)";
		timeline_context.strokeRect(10,y-23,1005,30);
		timeline_context.fillStyle = "rgb(0,0,0)";	
		timeline_context.fillText(patchLayers[i].name,20,y,1000);

		y+=30;
		
	}

	if(timeline_drop_index > timeline_selection_index){
		if(i==timeline_drop_index){			timeline_context.fillStyle = "rgb(100,100,200)";
			timeline_context.fillRect(15,y-10,1000,10);
		}
	}else{
		if(i==timeline_drop_index-1){			timeline_context.fillStyle = "rgb(100,100,200)";
			timeline_context.fillRect(15,y-10,1000,10);
		}
	}

	if(timeline_drag){

		timeline_context.fillStyle = "rgb(100,100,200)";
		timeline_context.fillRect(timeline_selection_x,timeline_selection_y,1005,30);			

		timeline_context.strokeRect(timeline_selection_x,timeline_selection_y,1005,30);
		timeline_context.fillStyle = "rgb(0,0,0)";	
		timeline_context.fillText(patchLayers[timeline_selection_index].name,timeline_selection_x+10,timeline_selection_y+23,1000);

	}
}

//add frame (more precisely, append frame)
function addFrame(){
	var length = patch.frames.length;
	var newFrame = new Array();
	for(var i in patch.frames[length - 1]){
		var newLayer = new Object();
		console.log("layer copied = "+i);
		for(var v in patch.frames[length - 1][i]){
			var newVal= patch.frames[length - 1][i][v];
			console.log("object copied = "+v+" with value "+newVal);
			
			newLayer[v] = newVal;
		}
		newFrame[i] = newLayer;
	}
	
	patch.frames[length] = newFrame;
	console.log(patch.frames[length]);
	
}

//go to next frame
function nextFrame(){
	frame = (++frame)%(patch.frames.length);
	document.getElementById("frameNum").innerHTML = frame;
}

//go to previous frame
function previousFrame(){
	console.log("frame before = "+frame);
	frame = ((--frame) + patch.frames.length) % patch.frames.length;
	document.getElementById("frameNum").innerHTML = frame;
	console.log("frame after = "+frame);
}

//send in layer name still not used
function submitLayerName(){
	console.log("pressed enter");
	console.log("layer name received = "+document.getElementById("layerFeild").value);
}

//print patch JSON. Standin for a proper save/export routine
function printPatch(){
	var string = JSON.stringify(patch);
	document.getElementById("output").innerHTML = string;

}

//durn playing on or off
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

//process a mouse click in the layer area
function processLayerMouseClick(click_x, click_y){

	var y = 30;
	timeline_drag  = false;

	var patchLayers = patch.frames[frame];
	var numLayers = patchLayers.length;
	clearSelectedLayer();
	for(var i = numLayers-1; i>=0; i--){
		if(click_x>10 && click_x<1005 && click_y>y-23 && click_y<y+7){
			selectLayer(i);
			setLayerSelectionOffsets(10, y-23, click_x, click_y);
			timeline_drag = true;
			timeline_drop_index = i;
		}
		y+=30;
	}
	
}

//select a layer
function selectLayer(layerNum){
	timeline_selection_index = layerNum;
}

//clear the selection
function clearSelectedLayer(){
	console.log("cleared");
	timeline_selection_index = null;
}

//set the object mouse offsets for the 
function setLayerSelectionOffsets(x, y, click_x, click_y){
	timeline_selection_x = x;
	timeline_selection_x_offset = x - click_x;
	timeline_selection_y = y;
	timeline_selection_y_offset = y - click_y;
}

//Layer control events

//react to a mouse click on the layer area
timeline_canvas.addEventListener("mousedown", function(e){
    var click_x = e.pageX - this.offsetLeft;
    var click_y = e.pageY - this.offsetTop;
    if(click_x>=0 && click_x<timeline_canvas.width && click_y>=0 && click_y<timeline_canvas.height)
    {
        processLayerMouseClick(click_x, click_y);
    }
});

//react to mouse movement on the layer area
timeline_canvas.addEventListener("mousemove", function(e){

    var mouse_x = e.pageX - this.offsetLeft;
    var mouse_y = e.pageY - this.offsetTop;

		//set selection coords
		timeline_selection_x = mouse_x + timeline_selection_x_offset;
		timeline_selection_y = mouse_y + timeline_selection_y_offset;

		//set drop index

		if(timeline_drag){
			console.log(((timeline_drop_index*30)+30)+":"+timeline_selection_y+":"+((timeline_drop_index*30)+50));
	
			if((timeline_selection_y<((timeline_drop_index*30)) || timeline_selection_y>((timeline_drop_index*30)+50))){
				var y_from_top = 30
				var layers = patch.frames[frame]
				console.log("triggered");
				timeline_drop_index = 0;
				for(var i = layers.length-1; i >= 0; i--){
					if(timeline_selection_y<y_from_top){
						timeline_drop_index = i;
						break;
					}
					y_from_top+=30;
				}
			}
		}	
			
 });

//react to end of a mouse click on the layer area
timeline_canvas.addEventListener("mouseup", function(e){
  if(timeline_drag){
		console.log("released mouse");
		timeline_drag = false;

		//Place layer
		var newLayersArrangement = [];
		
		console.log("dropping at index"+timeline_drop_index);

		for(var i = 0; i<patch.frames[frame].length; i++){
	
			if(timeline_drop_index>timeline_selection_index){
				if(i!=timeline_selection_index) 
					newLayersArrangement.push(patch.frames[frame][i]);
				if(i==timeline_drop_index){
				 	newLayersArrangement.push(patch.frames[frame][timeline_selection_index]);
				}
			}else{
				if(i==timeline_drop_index){
				 	newLayersArrangement.push(patch.frames[frame][timeline_selection_index]);
				}
				if(i!=timeline_selection_index) 
					newLayersArrangement.push(patch.frames[frame][i]);
			}
		}

		patch.frames[frame] = newLayersArrangement;
		clearSelectedLayer();
		
		timeline_drop_index = -2;
	}
});

//canvas control

//process a click in the canvas area
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

//react to a mouse click on the canvas area
canvas.addEventListener("mousedown", function(e){
    var click_x = e.pageX - this.offsetLeft;
    var click_y = e.pageY - this.offsetTop;
    if(click_x>=0 && click_x<timeline_canvas.width && click_y>=0 && click_y<timeline_canvas.height)
    {
        processCanvasMouseClick(click_x, click_y);
    }
});

//react to mouse movement on the canvas area
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

//react to end of a mouse click on the layer area
canvas.addEventListener("mouseup", function(e){
	
	canvas_drag = false;
});
