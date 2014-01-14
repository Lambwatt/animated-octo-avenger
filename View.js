//assign canvas
var canvas = document.getElementById("canvas");
var canvas_context = canvas.getContext("2d");

//assign layerCanvas (where the layers/frame will sit.) //consider renaming to timeline canvas
var timeline_canvas = document.getElementById("timeline_canvas");
var timeline_context = timeline_canvas.getContext("2d");

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
