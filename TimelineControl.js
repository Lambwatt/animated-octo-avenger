timeline_context.font="32px Courier New";	//Layer display font

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
	//if(!layerFound) clearSelectedLayer();

	
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
		//clearSelectedLayer();
		
		timeline_drop_index = -2;
	}
});

