import * as Redux from 'redux';

interface SelectedAction extends Redux.Action {
  payload: number;
}

interface AppState {
  selected: number;
}

const initialState: AppState = {
  selected: null,
};

const actions = {
  toggle({ selected }: AppState, element: SelectedAction): AppState {
    return { selected: selected = element.payload }
  },
};

const store = Redux.createStore((state = initialState, action: Redux.Action) =>
(actions[action.type] || ((s: AppState) => s))(state, action));

const update = () => {
  const selected = (store.getState() as AppState);
  const toggle = [].slice.call(document.getElementsByClassName('list')[0]
    .querySelectorAll('.toggle'));

  toggle.forEach((element: HTMLElement) => element.classList.remove('toggle--active'));
  toggle[selected.selected].classList.add('toggle--active');
};

store.subscribe(update);

const button = [].slice.call(document.querySelectorAll('button'));

button.forEach((element: HTMLElement, index: number) =>
  element.addEventListener('click', () =>
    store.dispatch({ type: 'toggle' , payload: index })));

