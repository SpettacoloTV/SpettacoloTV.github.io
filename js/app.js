$(function(){

	var $tvShowsContainer = $('.Shows');

	$tvShowsContainer.on('click', 'i.fa-heart', function(ev){
		var $this = $(this);
		$this.toggleClass('redheart')
	})

	function renderShows (shows){
		$tvShowsContainer.find('.loader').remove();
		shows.forEach(function(show){
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image.medium)
				.replace(':img alt:', show.name + " Portada")
				.replace(':status:', show.status)

			var $article = $(article)
			$tvShowsContainer.append($article.fadeIn(1500).css("display", "inline-block"))
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

	if(!localStorage.shows){
		$.ajax('http://api.tvmaze.com/shows')
			.then(function(shows){
				$tvShowsContainer.find('.loader').remove();
				localStorage.shows = JSON.stringify(shows);
				renderShows(shows);
			})
	}else{
		renderShows(JSON.parse(localStorage.shows));
	}

});