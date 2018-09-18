import * as Redux from 'redux';

interface AppState {
  selected: number | null;
}

const initialState: AppState = {
  selected: null,
};

// tslint:disable-next-line:variable-name
const Actions = {
  toggle({ selected }: AppState, { id }: { id: number }): AppState {
    return { selected: selected === id ? null : id };
  },
};

const update = () => {
  const { selected } = store.getState() as AppState;
  const accordionToggle = [].slice.call(document.getElementsByClassName('teaser__related--show')[0]
    .querySelectorAll('.accordion__toggle'));

  accordionToggle.forEach((element: HTMLElement, index: number) => {
    const parent = element.closest('.accordion__item');
    const isParentVisible = parent.classList.contains('accordion__item--show');
    parent.classList[
      (selected === index && !isParentVisible) ? 'add' : 'remove'
    ]('accordion__item--show');

    element.innerText = selected === index ? '-' : '+';
  });
};

// dispatch => action => subscriptions
export const store = Redux.createStore((state = initialState, action: Redux.Action) =>
  (Actions[action.type] || ((s: AppState) => s))(state, action));

store.subscribe(update);
