$(document).ready(function(){
	$(".input-btn").click(function() {
		
		console.log($(".mail").val())
		var nombre = $(".nombre").val();
			mail = $(".mail").val();
			validacion_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
			mensaje = $(".text-area").val();
		console.log(validacion_email.test(email))
		if (nombre == "") {
		    $(".nombre").focus();
		    return false;
		//}else if(email == "" || !validacion_email.test(email)){
		  }else if(mail == ""){	
		    $(".mail").focus();	
		    return false;
		}else if(mensaje == ""){
		    $(".text-area").focus();
		    return false;
		}else{
			$('.ajaxgif').removeClass('hide');
			var datos = 'nombre='+ nombre + 
						'&mail=' + mail + 
						'&mensaje=' + mensaje;
						
			$.ajax({
	    		type: "POST",
	    		url: $(this).attr('action'),
	    		data: datos,
	    		success: function() {
					$('.ajaxgif').hide();
	      			$('.msg').text('Mensaje enviado!').addClass('msg_ok').animate({ 'right' : '130px' }, 300);	
	    		},
				error: function() {
					$('.ajaxgif').hide();
	      			$('.msg').text('Hubo un error!').addClass('msg_error').animate({ 'right' : '130px' }, 300);					
				}
	   		});
	 		return false;	
		}
	});
});