
  /// <reference types="jquery"/>

(function(jquery: JQueryStatic, window: any, document: any) {
  /**
   * A sample jQuery plugin written in Typescript.
   */

  const refClasses = {
    teaserCloseButton: '.teaser__accordionClose',
    teaserButton: '.teaser__button',
    teaserClose: '.teaser__accordionClose',
    teaserRelated: '.teaser__related',
  };

  class Plugin
  {
    public static pluginName: string = 'bioteaserComponent';

    private element: Element;
    private teaserCloseButtonArray: HTMLElement[];

    private teaserClose: HTMLElement;

    private teaserButton: HTMLElement;
    private teaserButtonArray: HTMLElement[];

    private teaserRelated: HTMLElement;
    private teaserRelatedArray: HTMLElement[];
    /**
     * Initializes a new instance of the plugin.
     *
     * @param element   The DOM element.
     */
    constructor(element: Element)
    {
      this.element = element;
      this.teaserClose = this.element.querySelector('.teaser__accordionClose');
      this.teaserButtonArray = [].slice.call(this.element.querySelectorAll(refClasses.teaserButton));
      this.teaserCloseButtonArray = [].slice.call(this.element.querySelectorAll(refClasses.teaserCloseButton));
      this.teaserRelated = this.element.querySelector('.teaser__related');
      this.teaserRelatedArray = [].slice.call(this.element.querySelectorAll(refClasses.teaserRelated));

      this.init();
    }

    /**
     * Initialization.
     */
    public init() : void
    {
      this.teaserButtonArray.forEach((element: HTMLElement) => {
        element.addEventListener('click', this.toggleOverlay.bind(this));
      });

      this.teaserCloseButtonArray.forEach((element: HTMLElement) => {
        element.addEventListener('click', this.closeOverlay.bind(this));
      });
    }

    private toggleOverlay({ target }: Event): void {
      const relatedContent = (target as HTMLElement).parentElement.parentElement.nextElementSibling;
      relatedContent.classList.add('teaser__related--show');
    }

    private closeOverlay(): void {
      this.teaserCloseButtonArray.forEach((element: HTMLElement) => {
        element.closest(refClasses.teaserRelated).classList.remove('teaser__related--show');
      });
    }
  }

  jquery.fn[Plugin.pluginName] = function() {
    return this.each(function() {
      const $this = $(this);
      if (!$this.data(Plugin.pluginName)) {
        $this.data(Plugin.pluginName, new Plugin(this));
      }
    });
  };
})(jQuery, window, document);

