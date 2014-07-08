var quoteSpace = (function(){

	quotes = [];

	createQuote = function(text, author, rating) {
		this.text = text;
		this.author = author;
		this.rating = rating;
	};

	addQuote = function(text, author, rating) {
		this.quotes.push(new createQuote(text, author, rating));
	};

	// sortQuotes = function() {
	// 	this.quotes = _.sortBy(this.quotes, function(a, b) {
	// 		return this.quotes[b].rating - this.quotes[a].rating;
	// 	})
	// };

	populateQuotes = function() {
		for (var i = 0; i < this.quotes.length; i++) {
			$(".quotes-main").append(
				"<div class = 'quote-block'>" + 
				"<p class = 'a-quote'>" + this.quotes[i].text + "</p>" + 
				"<p class = 'an-author'>" + this.quotes[i].author + "</p>" +
				"</div>"
			)
		}
	};

	return {
		quotes: quotes,
		addQuote: addQuote,
		populateQuotes: populateQuotes
	};


})();

// var first = new quoteSpace.addQuote("stuff", "the good Dr.", 5);
// console.log(first)

quoteSpace.addQuote("The Edge... there is no honest way to explain it because the only people who really know where it is are the ones who have gone over.", "Hunter S. Thompson", 5)
quoteSpace.addQuote("America... just a nation of two hundred million used car salesmen with all the money we need to buy guns and no qualms about killing anybody else in the world who tries to make us uncomfortable.", "Hunter S. Thompson", 1)
quoteSpace.addQuote("In a closed society where everybody's guilty, the only crime is getting caught. In a world of thieves, the only final sin is stupidity.", "Hunter S. Thompson", 4)
quoteSpace.addQuote("For every moment of triumph, for every instance of beauty, many souls must be trampled.", "Hunter S. Thompson", 5)

console.log(quoteSpace.quotes)



$(document).on('ready', function() {
	quoteSpace.populateQuotes();
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
		quoteSpace.addQuote($(".quote-text-input").val(), $(".author-text-input").val(), $('input:radio[name=rating]:checked').val())
	})
});