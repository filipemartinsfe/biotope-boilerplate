
((jquery: JQueryStatic) => {
  const refClasses = {
    accordionItem: '.accordion__item',
  };

  class Plugin {
    public static pluginName: string = 'accordionPlugin';

    private element: Element;
    private accordionItems: HTMLElement[];

    /**
     * Initializes a new instance of the plugin.
     *
     * @param element   The DOM element.
     */
    constructor(element: Element) {
      this.element = element;
      this.accordionItems = [].slice.call(this.element.querySelectorAll(refClasses.accordionItem));

      this.init();
    }

    /**
     * Initialization.
     */
    public init(): void {
      this.accordionItems.forEach((element) => {
        element.addEventListener('click', this.toggleAccordion(element).bind(this));
      });
    }

    private toggleAccordion(parent: HTMLElement): () => void {
      return () => {
        if (parent.classList.contains('accordion__item--show')){
          parent.classList.remove('accordion__item--show');
          parent.querySelector('.accordion__toggle').innerHTML = '+';
        } else {
          this.accordionItems.forEach((element) => {
            element.classList.remove('accordion__item--show');
            element.querySelector('.accordion__toggle').innerHTML = '+';
          });
          
          parent.classList.add('accordion__item--show');
          parent.querySelector('.accordion__toggle').innerHTML = '-';
        }
      };
    };
  }

  jquery.fn[Plugin.pluginName] = function() {
    return this.each(function() {
      let $this = $(this);
      if(!$this.data(Plugin.pluginName)) {
        $this.data(Plugin.pluginName, new Plugin(this));
      }
    });
  };
})(jQuery);
