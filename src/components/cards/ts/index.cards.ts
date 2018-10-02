  /// <reference types="jquery"/>
  // import data from '../../page/scaffolding/pageContent';
  import * as contentful from 'contentful';
  // import { describe } from 'mocha';
  // import { assert } from 'chai';
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


        contentfulClient.getEntries()
        .then((response) => response)
        .then((myJson) => {
          const dataAPI = myJson.items.map((n) => n.fields);
          this.createCards(dataAPI);
          this.initialStances(dataAPI);
        })
        .catch(console.error); 
      }

      private createCards(args: any) {
        args.forEach((element: any) => {
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
      }

      private initialStances(dataAPI: any){
        this.cardsTopic = Array.from(this.element.querySelectorAll(refClasses.cardsTopic));
        this.cardsTopic.forEach(
          (element: HTMLElement, index) => element.addEventListener('click', () => this.showModal(index, dataAPI)));

          const query = window.location.search.substr(1).split('&').reduce((accumulator: any, item: any) => ({
            ...accumulator,
            [item.split('=')[0]]: item.split('=')[1] || '',
          }), {});
          const backLink = query.city;

          dataAPI.forEach((element: any, index: number) => {
            if(element['linkHash'] == backLink){
              this.showModal(index, dataAPI);
            } 
          });
      }


      private showModal(index: number, dataAPI: any) {
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

          this.closeModal = document.querySelector(refClasses.closeModal);
          this.closeModal.addEventListener('click', 
          () => {
            overlay.classList.remove('overlay--active');
            overlay.innerHTML = '';
            window.history.pushState('', '', baseUrl);
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


//     var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });
  })(jQuery, window, document);

