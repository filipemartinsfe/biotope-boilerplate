import * as Redux from 'redux';
import { createStore } from 'redux';


interface SelectedAction extends AppState {
  payload: number;
}

interface AppState {
  selected: number;
}

const initialState: AppState = {
  selected: null,
};

const reducer = (state: AppState, action: Redux.Action) => {
  console.log(state.selected);
  switch (action.type) {
    case 'WITHDRAW-MONEY':
      return { selected: state.selected };
    case 'DEPOSIT-MONEY':
      return { selected: state.selected };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

const update = () => {
  const state = (store.getState() as AppState);
  console.log(state);
};

store.subscribe(update);

const withdrawBtn = document.getElementById('withdraw');
const depositBtn = document.getElementById('deposit');

withdrawBtn.addEventListener('click', () => store.dispatch({ type: 'WITHDRAW-MONEY', payload: '5000' }));
depositBtn.addEventListener('click', () => store.dispatch({ type: 'DEPOSIT-MONEY', payload: '10000' }));
