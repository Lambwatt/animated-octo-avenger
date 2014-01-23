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

var intervalsPerFrame = 24;
var x = document.getElementById("intPerFram").value;
console.log("x = "+x);

//var head = document.getElementById("head");
var images = document.getElementsByTagName("img");
console.log("images = "+images);

var selection = document.getElementById("imageSelection");

for(var i in images){

	if(images[i].id!=null){
		selection.innerHTML+='<option value="'+images[i].id+'">'+images[i].id+'</option>';
		console.log('should have added <option value="'+images[i].id+'>'+images[i].id+'</option>');
	}
}

