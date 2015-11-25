define([
	'jquery',
	'lol'
], function (
	$,
	lol
) {
	'use strict';

	$(document.body).append($('<p />').text('My name is ' + lol));
});
