sameCol = function(div1, div2){

	var check = $(div1).offset().left - $(div2).offset().left;
	return check < 320 & check > -320;

}

spacing = function(divup, divdown){
	
	return $(divup).offset().top + $(divup).height() - $(divdown).offset().top;
	
}

moveIt = function(div, amt){
	
	if(-amt > 20 + 14*2){
		$(div).css("transform", "translate(0px, " + (amt+14*2+20) + "px)");
	}
	
}

colMat = function(divs){
	
	var divids = [];
	divs.each(function(){ 
		
		$(this).css("transform", "translate(0px, 0px)");
		divids.push("#" + $(this).attr("id"));
	
	});
	
	// find divs in top row
	
	var heights = [];
	divs.each(function(){
		
		heights.push($(this).offset().top);
		
	})
	
	var topdivs = divids.filter(function(value, index){
		
		return heights[index] <= Math.min.apply(null, heights);
		
	})
	console.log(topdivs);
	// for each column, find other divs in that column, 
	// and move up in order of distance from top
	
	for(var i = 0; i < topdivs.length; i++){
		var coldivs = [];
		var dists = [];
		// identify and compute distance
		for(var j = 0; j < divids.length; j++){
			if(topdivs[i] != divids[j] & sameCol(topdivs[i], divids[j])){
				coldivs.push(divids[j]);
				dists.push(spacing(topdivs[i], divids[j]));
			}	
		}
		
		var sdist = dists.sort(function(a, b){ return -a+b; });
		var dexof = [];
		$.each(sdist, function(dex, sorted){
			
			dexof.push($.inArray(sorted, dists));
			
		});
		for(j = 0; j < dexof.length; j++){
			
			if(j == 0){
				
				moveIt(coldivs[dexof[j]], dists[dexof[j]]);
				
				
			} else {
				
				moveIt(coldivs[dexof[j]], spacing(coldivs[dexof[j - 1]], coldivs[dexof[j]]));
				
			}
			
		}
		
		
	}
}


var resizeTimer;
$(window).resize(function(){ 
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function(){ colMat($(".section")); }, 50);
		
})
