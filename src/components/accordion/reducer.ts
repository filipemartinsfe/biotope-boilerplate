import * as Redux from 'redux';

interface AppState {
  selected: number;
}

const initialState: AppState = {
  selected: null,
};

const Actions = {
  toggle({ selected }: AppState,  id: number) {
    return { selected: selected === id ? null : id };
  },
};

const update = () => {
  const selected = store.getState();
  const check = selected.selected.id;
  const accordionToggle = [].slice.call(document.getElementsByClassName('teaser__related--show')[0]
  .querySelectorAll('.accordion__toggle'));

  accordionToggle.forEach((element: HTMLElement, index: number) => {
    const parent = element.closest('.accordion__item');
    parent.classList[(check == index && !parent.classList.contains('accordion__item--show')) ? 'add' : 'remove']('accordion__item--show');
  });
};

// dispatch => action => subscriptions
export const store = Redux.createStore((state = initialState, action: Redux.Action) => (Actions[action.type] || ((s: AppState) => s))(state, action));

store.subscribe(update);

