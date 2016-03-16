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

	/*-------------------------------
		# Llamado Ajax
	-------------------------------*/

	var template = '<article class="Shows-show">' +
	'<figure class="Shows-show-cover"><img src=":img:" class="img" alt=":img alt:">' +
          '<figcaption class="Shows-show-cover-episode">' +
            '<p>:language:</p>' +
          '</figcaption>' +
          '<figcaption class="Shows-show-cover-name">' +
            '<h2>:name:</h2><i class="fa fa-heart"></i>' +
          '</figcaption>' +
        '</figure>' +
      '</article>';

	$.ajax({
		url: 'http://api.tvmaze.com/shows',
		success: function(shows, textStatus, jqXHR){
			var $tvShowsContainer = $('.Shows')
			shows.forEach(function(show){
				var article = template
					.replace(':name:', show.name)
					.replace(':img:', show.image.medium)
					.replace(':img alt:', show.name + " Portada")
					.replace(':language:', show.language)
				
				$tvShowsContainer
					.append($(article))
			})
		}
	})

});