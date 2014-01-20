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

function insertFrame(){
	var newFrameset = new Array();
	for(var j = 0; j<patch.frames.length; j++){
		var newFrame = new Array();
		for(var i = 0; i<patch.frames[j].length; i++){
			var newLayer = new Object();
			console.log("layer copied = "+i);
			for(var v in patch.frames[j][i]){
				var newVal= patch.frames[j][i][v];
				//console.log("object copied = "+v+" with value "+newVal);
			
				newLayer[v] = newVal;
			}
			newFrame[i] = newLayer;
		}
		console.log("j+1 = "+ (1+j)+", j = "+j);
		console.log("assigning frame to "+(j>frame ? (1+j): (j)));
		newFrameset[j>frame ? j+1: j] = newFrame;

		if(frame==j){
			var newFrame = new Array();
			for(var i in patch.frames[j]){
				var newLayer = new Object();
				console.log("layer copied = "+i);
				for(var v in patch.frames[j][i]){
					var newVal= patch.frames[j][i][v];
					//console.log("object copied = "+v+" with value "+newVal);
			
					newLayer[v] = newVal;
				}
				newFrame[i] = newLayer;
			}
			console.log("assigning duplicate frame to "+(j+1));
			newFrameset[j+1] = newFrame; 
			//console.log(patch.frames[length]);
		}
	}
	patch.frames = newFrameset;
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

