$(function(){

	var $tvShowsContainer = $('.Shows');

	function renderShows (shows){
		shows.forEach(function(show){
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image.medium)
				.replace(':img alt:', show.name + " Portada")
				.replace(':status:', show.status)

			var $article = $(article)
			$tvShowsContainer.append($article)
		})
	}

	/*-------------------------------
		# Submit search form
	-------------------------------*/

	$('.Header-form')
		.submit(function (ev){
			ev.preventDefault();
			var busqueda = $(this)
				.find('input[type="text"]')
				.val();
			$tvShowsContainer.find('.Shows-show').remove()
			var $loader = $('<div class="loader">');
			$loader.appendTo($tvShowsContainer);			
			$.ajax({
				url: 'http://api.tvmaze.com/search/shows',
				data: { q: busqueda },
				success: function(res, textStatus, jqXHR){
					$loader.remove();
					var shows = res.map(function(el){
						return el.show;
					})
					renderShows(shows);
				}
			})
		})

	/*-------------------------------
		# Llamado Ajax
	-------------------------------*/

	var template = '<article class="Shows-show">' +
	'<figure class="Shows-show-cover"><img src=":img:" class="img" alt=":img alt:">' +
          '<figcaption class="Shows-show-cover-episode">' +
            '<p>:status:</p>' +
          '</figcaption>' +
          '<figcaption class="Shows-show-cover-name">' +
            '<h2>:name:</h2><i class="fa fa-heart"></i>' +
          '</figcaption>' +
        '</figure>' +
      '</article>';

	$.ajax({
		url: 'http://api.tvmaze.com/shows',
		success: function(shows, textStatus, jqXHR){
			$tvShowsContainer.find('.loader').remove();
			renderShows(shows);
		}
	})

});