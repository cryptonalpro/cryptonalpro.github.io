$(document).ready(function(){


	$(window).on('load', function () {
			$('.load').delay(500).fadeOut('slow');
	});



	let sizebrouserX=$(window).width();
	let sizebrouserY=$(window).height();
	$( window ).resize(function() {
		sizebrouser=$(window).width();
		sizebrouserY=$(window).height();
	});
	
	function movementClass(){
		if(800<=sizebrouserX<1024){
			$('.mobhide').removeClass('img_slide_right');
			$('#blockMobile2').addClass('txt_slide_right');
		}else{
			$('.mobhide').addClass('img_slide_right');
			$('#blockMobile2').removeClass('txt_slide_right');
		}
	}

//movementClass();

function anime(classname){
	let elem=0;
	let show=false;
	let pipka;
	let r=1;
	$(window).scroll(function(){
		var elem_mass = document.getElementsByClassName(classname);		
		if(elem_mass.length>0){
			if(elem<elem_mass.length){
				if(elem_mass[elem].getBoundingClientRect().top<=sizebrouserY*0.66){
					if(classname==='img_slide_left'){
						$(elem_mass[elem]).removeClass('img_left_hide');
						$(elem_mass[elem]).addClass('img_left_show');	
					}
					if(classname==='img_slide_right'){
						$(elem_mass[elem]).removeClass('img_right_hide');
						$(elem_mass[elem]).addClass('img_right_show');
					}
					if(classname==='txt_slide_left'){
						$(elem_mass[elem]).removeClass('block_left_hide');
						$(elem_mass[elem]).addClass('block_left_show');	
					}
					if(classname==='txt_slide_right'){
						$(elem_mass[elem]).removeClass('block_right_hide');
						$(elem_mass[elem]).addClass('block_right_show');	
					}
					if(elem<=elem_mass.length-1){
						elem+=1;
					}
					show=true;
				}
			}
			if(show){
				if(elem>0&&elem<=elem_mass.length){
					pipka=elem-1;
				}else{
					pipka=elem;
				}
				if(elem_mass[pipka].getBoundingClientRect().top>sizebrouserY*0.66){
					if(classname==='img_slide_left'){
						$(elem_mass[pipka]).removeClass('img_left_show');
						$(elem_mass[pipka]).addClass('img_left_hide');	
					}
					if(classname==='img_slide_right'){
						$(elem_mass[pipka]).removeClass('img_right_show');
						$(elem_mass[pipka]).addClass('img_right_hide');
					}
					if(classname==='txt_slide_left'){
						$(elem_mass[pipka]).removeClass('block_left_show');
						$(elem_mass[pipka]).addClass('block_left_hide');	
					}
					if(classname==='txt_slide_right'){
						$(elem_mass[pipka]).removeClass('block_right_show');
						$(elem_mass[pipka]).addClass('block_right_hide');	
					}
					if(elem>0){
						elem=elem-1;	
					}
				}
			}
		}
	});
}
anime('img_slide_left');
anime('txt_slide_right');
anime('img_slide_right');
anime('txt_slide_left');




    // scrolling
    jQuery.scrollSpeed(90, 700);
    
    function getElementPosition(elemId)
    {
    	var elem = document.getElementsByClassName(elemId);

    	console.log(elem)  	;
    	var rect = elem[0].getBoundingClientRect();

    }

});