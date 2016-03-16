$(function(){
	/*-------------------------------
		# Submit search form
	-------------------------------*/

	$('.Header-form')
		.submit(function (ev){
			ev.preventDefault();
			var busqueda = $(this)
				.find('input[type="text"]')
				.val();
			alert("Estas buscando: " + busqueda)
		})

});