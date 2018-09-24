///<reference types="jquery"/>

(function($: JQueryStatic, window: any, document: any) {

	/**
	 * A sample jQuery plugin written in Typescript.
	 */
	class Plugin
	{
		public static NAME: string = 'tabMenuComponent';

		private element: Element;
		private $element: JQuery;
		private options: any;
		private defaults: any = {
			option1: 'change this'
		};

		/**
		 * Initializes a new instance of the plugin.
		 *
		 * @param element   The DOM element.
		 * @param options   Plugin options.
		 */
		constructor(element: Element, options: any)
		{
			this.element = element;
			this.$element = $(element);

			// extend default options
			this.options = $.extend({}, this.defaults, options);

			// init plugin
			this.init();
		}

		/**
		 * Initialization.
		 */
		public init() : void
		{
			console.log('init typescript boilerplate plugin');

			this.$element.on('click', () => {
				console.log('clicked element');
			});
		}
	}

	$.fn[Plugin.NAME] = function(options: any) {

		return this.each(function() {
			let $this = $(this);
			if(!$this.data(Plugin.NAME)) {
				$this.data(Plugin.NAME, new Plugin(this, options));
			}
		});

	};

})(jQuery, window, document);
