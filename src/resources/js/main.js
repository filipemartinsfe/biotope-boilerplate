(function ($, window, document, undefined) {
	'use strict';

	$(function () {
		var $conditionalResources = $('[data-resources]');

		// listen to resourcesReady event
		$(window).one('resourcesReady', function() {
			init();
		});

		/* globals resourceLoader */
		resourceLoader({
			base: biotope.configuration.get('data.staticResourcesBase'),
			baseMap: {
				'##content': biotope.configuration.get('data.staticResourcesContentRepoBase')
			}
		});

		function init() {
			biotope.configuration.get('initCore')();

			// initialize components
			$conditionalResources.each(function() {
				if ($(this).data('init')) {
					var init = eval($(this).attr('data-init')); // jshint ignore:line
					init($(this));
				}
			});
		}

	});

	biotope.configuration.set('initCore', function () {

	});

})(jQuery, window, document);
