//assign canvas
var canvas = document.getElementById("canvas");
var canvas_context = canvas.getContext("2d");

//assign layerCanvas (where the layers/frame will sit.) //consider renaming to timeline canvas
var timeline_canvas = document.getElementById("timeline_canvas");
var timeline_context = timeline_canvas.getContext("2d");

var timeline_margin_width = 10;
var timeline_height_margin = 30;
var timeline_label_indent = 10;
var timeline_label_width = 256;
var timeline_text_width = 251;
var timeline_drop_index_width = 246;
var timeline_drop_index_height = 20;
var timeline_frame_offset = 0;

var timeline_width = 750;
var timeline_layer_height = 30;
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
	
	var y = timeline_height_margin;
	
	timeline_context.strokeStyle = "rgb(0,0,0)";
	timeline_context.strokeRect(timeline_margin_width+timeline_label_width, y-23, timeline_width, timeline_layer_height);

	y+= timeline_layer_height
	//for(var i = 0; i<20; i++){
	//}

	var patchLayers = patch.frames[frameNum];//Replace with frame offset
	var numLayers = patchLayers.length;
	
	for(var i = numLayers-1; i>=0; i--){
		if(timeline_drop_index > timeline_selection_index){
			if(i==timeline_drop_index){
				timeline_context.fillStyle = "rgb(100,100,200)";
				timeline_context.fillRect(15, y-10, timeline_drop_index_width, 10);

				y+=timeline_drop_index_height;
			}
		}else{
			if(i==timeline_drop_index-1){
				timeline_context.fillStyle = "rgb(100,100,200)";
				timeline_context.fillRect(15, y-10, timeline_drop_index_width, 10);

				y+=timeline_drop_index_height;
			}

		}

		if(i == timeline_selection_index){
			if(timeline_drag) continue;
			timeline_context.fillStyle = "rgb(100,100,200)";
			timeline_context.fillRect(timeline_margin_width, y-23, timeline_label_width, timeline_layer_height);	
		}	
		timeline_context.strokeStyle = "rgb(0,0,0)";
		timeline_context.strokeRect(timeline_margin_width, y-23, timeline_label_width, timeline_layer_height);
		timeline_context.fillStyle = "rgb(0,0,0)";	
		timeline_context.fillText(patchLayers[i].name, timeline_margin_width+timeline_label_indent, y, timeline_text_width);

		y+=timeline_layer_height;
		
	}

	if(timeline_drop_index > timeline_selection_index){
		if(i==timeline_drop_index){			
			timeline_context.fillStyle = "rgb(100,100,200)";
			timeline_context.fillRect(15, y-10, timeline_drop_index_width, timeline_layer_height);
		}
	}else{
		if(i==timeline_drop_index-1){			
			timeline_context.fillStyle = "rgb(100,100,200)";
			timeline_context.fillRect(15, y-10, timeline_drop_index_width, timeline_layer_height);
		}
	}

	if(timeline_drag){

		timeline_context.fillStyle = "rgb(100,100,200)";
		timeline_context.fillRect(timeline_selection_x, timeline_selection_y, timeline_label_width, timeline_layer_height);			

		timeline_context.strokeRect(timeline_selection_x, timeline_selection_y, timeline_label_width, timeline_layer_height);
		timeline_context.fillStyle = "rgb(0,0,0)";	
		timeline_context.fillText(patchLayers[timeline_selection_index].name, timeline_selection_x+timeline_label_indent, timeline_selection_y+23, timeline_text_width);

	}
}
