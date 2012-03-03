function initializeExternalLinks() {
	$('a').filter(function() {
		return this.hostname && this.hostname !== location.hostname;
	}).addClass('external');
	
	$('a.external').click(function(event) {
		open(this.href);
		event.preventDefault();
	});
}

function hideScreenshot() {
	$('#screenshot').hide();
}

$(function() {
	initializeExternalLinks();
	hideScreenshot();
});