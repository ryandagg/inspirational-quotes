var quoteSpace = (function(){

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
	var sortQuotes = function() {
		quotes = _.sortBy(quotes, function(obj) {
			return obj.rating;
		}).reverse();
	};

	var populateQuotes = function(div) {
		sortQuotes();
		$(div).empty();
		for (var i = 0; i < quotes.length; i++) {
			$(div).append(
				"<div class = 'quote-block'>" + 
					"<p class = 'a-quote'>" + quotes[i].text + "</p>" + 
					"<p class = 'an-author'>" + quotes[i].author + "</p>" +
				"</div>"
			)
		}
	};

	return {
		quotes: quotes,
		addQuote: addQuote,
		populateQuotes: populateQuotes,
	};


})();

quoteSpace.addQuote("The Edge... there is no honest way to explain it because the only people who really know where it is are the ones who have gone over.", "Hunter S. Thompson", 5)
quoteSpace.addQuote("America... just a nation of two hundred million used car salesmen with all the money we need to buy guns and no qualms about killing anybody else in the world who tries to make us uncomfortable.", "Hunter S. Thompson", 1)
quoteSpace.addQuote("In a closed society where everybody's guilty, the only crime is getting caught. In a world of thieves, the only final sin is stupidity.", "Hunter S. Thompson", 4)
quoteSpace.addQuote("For every moment of triumph, for every instance of beauty, many souls must be trampled.", "Hunter S. Thompson", 5)

// console.log(quoteSpace.quotes)


$(document).on('ready', function() {
	quoteSpace.populateQuotes(".quotes-main");
	// replace this with a function
	// for (var i = 0; i < quoteSpace.quotes.length; i++) {
	// 	$(".quotes-main").append(
	// 		"<div class = 'quote-block'>" + 
	// 		"<p class = 'a-quote'>" + quoteSpace.quotes[i].text + "</p>" + 
	// 		"<p class = 'an-author'>" + quoteSpace.quotes[i].author + "</p>" +
	// 		"</div>"
	// 	)
	// }

	$(document).on("click", ".submit-button", function() {
		// THIS IS NOT WORKING
		quoteSpace.addQuote($(".quote-text-input").val(), $(".author-text-input").val(), $('input:radio[name=rating]:checked').val());
		quoteSpace.populateQuotes(".quotes-main");
	})
});