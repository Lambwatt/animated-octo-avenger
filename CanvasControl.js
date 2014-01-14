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
