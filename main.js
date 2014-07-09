/* paste-bin:

*/

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

	// var createRadio = function(num) {
	// 	var string = ''
	// 	for (var j = 0; j < num; j++) {
	// 		string += 
	// 	}
	// 	return string;
	// }

	var populateQuotes = function(div, array) {
		var newArray = sortByRating(array);
		$(div).empty();
		for (var i = 0; i < newArray.length; i++) {
			$(div).append(
				"<div class = 'quote-block'>" + 
					"<p class = 'a-quote'>" + newArray[i].text + "</p>" + 
					"<a class = 'an-author'>" + newArray[i].author + "</a>" +
					"<div class='rating-input'>Rate this quote: " +
						"<input type='radio' name='rating" + i + "' value='1'" + (newArray[i].rating == 1 ? "checked = 'true'" : "") + "><span>1</span>" +
					    "<input type='radio' name='rating" + i + "' value='2'" + (newArray[i].rating == 2 ? "checked = 'true'" : "") + "><span>2</span>" +
					    "<input type='radio' name='rating" + i + "' value='3'" + (newArray[i].rating == 3 ? "checked = 'true'" : "") + "><span>3</span>" +
					    "<input type='radio' name='rating" + i + "' value='4'" + (newArray[i].rating == 4 ? "checked = 'true'" : "") + "><span>4</span>" +
					    "<input type='radio' name='rating" + i + "' value='5'" + (newArray[i].rating == 5 ? "checked = 'true'" : "") + "><span>5</span>" +
					"</div>" +
					"<button class = 'delete-button'>delete</button>" +
				"</div>"
			)
		}
	};

	var filterQuotes = function(array, author) {
		return array.filter(function(obj) {
			return obj.author === author;
		})
	};

	var indexOfObject = function(array, keyword, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][keyword] === value) {
				return i;
			}
		};
		return -1;
	}

	return {
		quotes: quotes,
		addQuote: addQuote,
		populateQuotes: populateQuotes,
		filterQuotes: filterQuotes,
		indexOfObject: indexOfObject,
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
		QuoteSpace.addQuote($(".quote-text-input").val(), $(".author-text-input").val(), null);
		QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.quotes);
	})

	// filter by author link
	$(document).on("click", ".an-author", function() {
		QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.filterQuotes(QuoteSpace.quotes, $(this).text()))
		$(".return-button").toggle();
	})

	// remove filter by author
	$(document).on("click", ".return-button", function() {
		$(".return-button").toggle();
		QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.quotes);
	})

	$(document).on("click", ".delete-button", function() {
		$(this).closest(".quote-block").prepend(
			"<div class = 'delete-popup'>" +
				"<button = class = 'confirm-button'>Confirm</button>" +
				"<button class = 'cancel-button'>cancel</button>" +
			"</div>"
			)
	})

	$(document).on("click", ".confirm-button", function() {
		var that = this;
		QuoteSpace.quotes = _.reject(QuoteSpace.quotes, function(obj) {
			return obj.text === $(that).closest(".quote-block").find(".a-quote").text()
		});
		QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.quotes);
	})

	$(document).on("click", ".cancel-button", function() {
		$(this).closest(".delete-popup").remove();
	})
	// input rating for quote 
	$(document).on("click", ".rating-input input", function() {
		var radioName = $(this).attr("name");
		// console.log(radioName);
		var radioValue = $("input[name=" + radioName + "]:checked").val();
		// console.log(radioValue);
		var quoteText = $(this).closest(".quote-block").find(".a-quote").text()
		// console.log(quoteText);
		var index = QuoteSpace.indexOfObject(QuoteSpace.quotes, "text", quoteText);
		QuoteSpace.quotes[index].rating = radioValue;
		QuoteSpace.populateQuotes(".quotes-main", QuoteSpace.quotes);
	})

	$(document).on("click", ".random-button", function() {
		$(".main-wrapper").prepend("<div class = 'random-popup'></div>");
		QuoteSpace.populateQuotes(".random-popup", [QuoteSpace.quotes[Math.floor(Math.random() * (QuoteSpace.quotes.length - 1))]])
		$(".random-popup").append("<button class ='random-close-button'> close</button>");
	})

	$(document).on("click", ".random-close-button", function() {
		$(".random-popup").remove();
	})
});