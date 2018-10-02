  /// <reference types="jquery"/>
  // import data from '../../page/scaffolding/pageContent';
  import * as contentful from 'contentful';
  (function(jquery: JQueryStatic, window: any, document: any) {
    const refClasses = {
      cardsTopic: '.cards__topic',
      closeModal: '.overlay__close',
    };

    class Plugin {
      public static pluginName: string = 'cardsComponent';

      private element: Element;
      private cardsTopic: HTMLElement[];
      private closeModal: Element;

      constructor(element: Element)
      {
        this.element = element;
        this.init();
      }

      public init() : void {

        const contentfulClient = contentful.createClient({
          accessToken: '692ae5ce01a73afc18ee2124bd7770b7407f24e396f99434e6b43ee66742a850',
          space: 'dqpi5k1479s6',
        });

        const thisInherit = this;

        contentfulClient.getEntries()
        .then((response) => response)
        .then(function(myJson) {
          thisInherit.ok(myJson);

          const dataAPI = myJson.items.map((n) => n.fields);

          dataAPI.forEach((element: any) => {
            const title = element.title;
            const description = element['description'];
            const date = element['date'].slice(0,10);
            const image =  element['image'].fields.file.url;

            document.getElementsByClassName('cards')[0].innerHTML +=
            `<div 
              class="cards__topic" 
              style="background: linear-gradient(to bottom, rgba(0,0,0,.75),rgba(0,0,0,0), rgba(0,0,0,.88)),
              url('${image}') no-repeat center/cover;">
              <div class="cards__date"> ${date} </div>
              <div class="cards__content">
                <h2 class="cards__title"> ${title} </h2>
                <p class="cards__description"> ${description} </p>
              </div>
            </div>`;
          });

          let showModal = (index: number) => {
            debugger
            const overlay =  document.getElementsByClassName('overlay')[0];
            const dataOverlay = dataAPI[index];
            overlay.innerHTML =
            `<div class="overlay__topic">
              <img class="overlay__img" src="${dataOverlay['image'].fields.file.url}" alt="">
              <img class="overlay__close" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/2000px-VisualEditor_-_Icon_-_Close_-_white.svg.png">
              <div class="overlay__content">
                <div class="overlay__primary">
                  <div class="overlay__title"> ${dataOverlay['title']} </div>
                  <div class="overlay__description"> ${dataOverlay['text']}</div>
                </div>

              </div>
            </div>`;

              let newUrl = `?city=${dataOverlay['linkHash']}`;

              const baseUrl = window.location.href.split('?')[0];
              
              window.history.pushState('', '', newUrl); 
    
              overlay.classList.add('overlay--active');
    
              thisInherit.closeModal = document.querySelector(refClasses.closeModal);
              thisInherit.closeModal.addEventListener('click', 
              () => {
                overlay.classList.remove('overlay--active');
                overlay.innerHTML = '';
                window.history.pushState('', '', baseUrl);
              });
          }

          thisInherit.cardsTopic = Array.from(thisInherit.element.querySelectorAll(refClasses.cardsTopic));
          thisInherit.cardsTopic.forEach(
            (element: HTMLElement, index) => element.addEventListener('click', () => showModal(index)));

          const query = window.location.search.substr(1).split('&').reduce((accumulator: any, item: any) => ({
            ...accumulator,
            [item.split('=')[0]]: item.split('=')[1] || '',
          }), {});
          const backLink = query.city;

          dataAPI.forEach((element: any, index) => {
            if(element['linkHash'] == backLink){
              showModal(index);
            } 
          });
        })
        .catch(console.error); 
      }

      private ok(args: any) {
        
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

