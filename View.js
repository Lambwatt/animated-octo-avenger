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

var canvas_block_size = 8;

var grid_canvas = document.createElement('canvas');
grid_canvas.width = canvas.width;
grid_canvas.height = canvas.height;
var grid_canvas_context = grid_canvas.getContext('2d');

drawGrid();

//set refresh interval for all screens. function runs all rendering //consider splitting up
setInterval(function() {
		//clear canvas
		canvas_context.clearRect(0 , 0 , canvas.width, canvas.height);

		canvas_context.drawImage(grid_canvas, 0, 0, canvas.width, canvas.height);
		

		//draw frame in canvas
    drawFrame(canvas_context, frame, 0, 0, 96, 164);

		//Slows frame rate from intended 30 fps
		if(playing && interval_count==0){ 
			frame = (++frame)%(patch.frames.length);
			document.getElementById("frameNum").innerHTML = frame;
		}
		interval_count = (++interval_count)%intervalsPerFrame;
		
		//document.getElementById("layerFeild").type = "hidden";//retrieve layer name if given //might be a relic of abandoned functionality

		//draw layers section
		drawLayers(frame);
	},30);

//layer rendering function
function drawLayers(frameNum){

	timeline_context.clearRect(0 , 0 , canvas.width, canvas.height);
	
	var y = timeline_height_margin;
	
//	timeline_context.strokeStyle = "rgb(0,0,0)";
//	timeline_context.strokeRect(timeline_margin_width+timeline_label_width, y-23, timeline_width, timeline_layer_height);

/*	timeline_context.beginPath();
	for(var i = 0; i<15; i++){
		timeline_context.moveTo(timeline_margin_width+timeline_label_width + (i*50),y-23);
		timeline_context.lineTo(timeline_margin_width+timeline_label_width + (i*50),y+6);
		
		timeline_context.fillText(i, timeline_margin_width+timeline_label_width +(i*50)+2.5, y, 20);

		timeline_context.moveTo(timeline_margin_width+timeline_label_width + (i*50) + 25,y-23);
		timeline_context.lineTo(timeline_margin_width+timeline_label_width + (i*50) + 25,y+6);

	}
	timeline_context.stroke();*/


//	y+= timeline_layer_height;


	var patchLayers = patch.frames[frameNum];//Replace with frame offset
	if(patchLayers != null){
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
			timeline_context.fillText(patch.layer_names[patchLayers[i].id], timeline_margin_width+timeline_label_indent, y, timeline_text_width);
	
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
			if(i>=0){
				timeline_context.fillText(patch.layer_names[patchLayers[i].id], timeline_selection_x+timeline_label_indent, timeline_selection_y+23, timeline_text_width);
			}//diff this. something was changed.
		}
	}
}

function drawGrid(){
	console.log(""+canvas.width+"x"+canvas.height+" area redone with block size: "+canvas_block_size);
	grid_canvas_context.clearRect(0,0,grid_canvas.width, grid_canvas.height);
	var num_col = 0;
	var num_row = 0;
	for(var i = 0; i<canvas.width; i+=2*canvas_block_size){
		num_col++;
		for(var j = 0; j<canvas.height;j+=2*canvas_block_size){
			consolenum_row++;
			grid_canvas_context.fillStyle = "rgb(200,200,200)";
			grid_canvas_context.fillRect(i, j+canvas_block_size, canvas_block_size, canvas_block_size);
			grid_canvas_context.fillRect(i+canvas_block_size, j, canvas_block_size, canvas_block_size);
		}
	}
	console.log("finished generation with "+num_row+" rows and "+num_col+" columns");
}

