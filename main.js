var QuoteSpace = (function(){

	var quotes = [];

	var Quote = function(text, author, rating) {
		this.text = text;
		this.author = author;
		this.rating = rating;
	};

	var addQuote = function(text, author, rating) {
		quotes.push(new Quote(text, author, rating));
	};

	// sorts the quotes by rating
	var sortByRating = function(array) {
		return _.sortBy(array, function(obj) {
			return obj.rating;
		}).reverse();
	};

	var populateQuotes = function(div, array) {
		var newArray = sortByRating(array);
		$(div).empty();
		for (var i = 0; i < newArray.length; i++) {
			$(div).append(
				"<div class = 'quote-block'>" + 
					"<p class = 'a-quote'>" + newArray[i].text + "</p>" + 
					"<a class = 'an-author'>" + newArray[i].author + "</a>" +
					"<div class = 'a-rating'>" + newArray[i].rating + " stars</div>" +
				"</div>"
			)
		}
	};

	var filterQuotes = function(array, author) {
		return array.filter(function(obj) {
			return obj.author === author;
		})
	};

	return {
		quotes: quotes,
		addQuote: addQuote,
		populateQuotes: populateQuotes,
		filterQuotes: filterQuotes,
	};


})();

QuoteSpace.addQuote("The Edge... there is no honest way to explain it because the only people who really know where it is are the ones who have gone over.", "Hunter S. Thompson", 5)
QuoteSpace.addQuote("America... just a nation of two hundred million used car salesmen with all the money we need to buy guns and no qualms about killing anybody else in the world who tries to make us uncomfortable.", "Hunter S. Thompson", 1)
QuoteSpace.addQuote("In a closed society where everybody's guilty, the only crime is getting caught. In a world of thieves, the only final sin is stupidity.", "Hunter S. Thompson", 4)
QuoteSpace.addQuote("For every moment of triumph, for every instance of beauty, many souls must be trampled.", "Hunter S. Thompson", 3)
QuoteSpace.addQuote("Don’t ask what the world needs. Ask what makes you come alive, and go do it. Because what the world needs is people who have come alive.", "Howard Thurman", 5)

// console.log(QuoteSpace.quotes)


$(document).on('ready', function() {
	QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.quotes);

	// quote submit button handler
	$(document).on("click", ".submit-button", function() {
		// submit button functionality
		QuoteSpace.addQuote($(".quote-text-input").val(), $(".author-text-input").val(), $('input:radio[name=rating]:checked').val());
		QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.quotes);
	})
	$(document).on("click", ".an-author", function() {
		QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.filterQuotes(QuoteSpace.quotes, $(this).text()))
	})

});