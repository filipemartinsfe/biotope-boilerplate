((jquery: JQueryStatic, window: Window) => {
  // const refClasses = {
  //   accordionItem: '.accordion__item',
  //   accordionHeader: '.accordion__header'
  // }

  // class learningPurposes {
  //   private element: HTMLElement;
  //   private accordionItem: HTMLElement;
  //   private accordionHeader: HTMLElement;
  //   private accordionItemLength: HTMLElement[];

  //   constructor(element: HTMLElement) {
  //     this.element = element;
  //     this.buildRefs();
  //     this.initListeners();
  //     this.toggleAccordion();
  //   }

  //   private buildRefs() {
  //     this.accordionItem = this.element.querySelector(refClasses.accordionItem);
  //     this.accordionItemLength = [].slice.call(this.element.querySelectorAll(refClasses.accordionItem));
  //     this.accordionHeader = this.element.querySelector(refClasses.accordionHeader);
  //   }

  //   private initListeners(): void {
  //     this.accordionItemLength.forEach((accordionItem: HTMLElement) => {
  //       accordionItem.addEventListener('click', this.toggleAccordion.bind(this));
  //     });
  //   }

  //   private toggleAccordion() {
  //     console.log('yeahhh');
  //   }
  // }

  // const newAccordionClass = new learningPurposes(this.element);


  // $('.accordion__header').click(function(){
  //   const parent = $(this).parent('.accordion__item');
  //   $('.accordion__item').find('.accordion__toggle').text('+');
  //   $('.accordion__item').removeClass('accordion__item--show');
  //   parent.toggleClass('accordion__item--show');
  //   if (parent.hasClass('accordion__item--show')) {
  //     parent.find('.accordion__toggle').text('-');
  //   } 
  // });
  
  ///<reference types="jquery"/>
	/**
	 * A sample jQuery plugin written in Typescript.
	 */

  const refClasses = {
    accordionItem: '.accordion__item',
    accordionHeader: '.accordion__header'
  }

	class Plugin
	{ 
		public static NAME: string = 'accordionPlugin';

		private element: Element;
		private $element: JQuery;
    private options: any;
    private accordionItem: HTMLElement;
    private accordionHeader: HTMLElement;
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
      debugger;
			this.element = element;
      this.$element = $(element);
      this.accordionItem = this.element.querySelector(refClasses.accordionItem);
      this.accordionHeader = this.element.querySelector(refClasses.accordionHeader);
      
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

			this.accordionHeader.addEventListener('click', () => {
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
  
})(jQuery, window);
