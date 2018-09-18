// import * as Redux from 'redux';
// import { createStore } from 'redux';


// const reducer = (state, action: Redux.Action) => {
//   switch (action.type) {
//     case 'WITHDRAW-MONEY':
//       return { state };
//     case 'DEPOSIT-MONEY':
//       return { state };
//     default:
//       return state;
//   }
// };

// const store = createStore(reducer, initialState);

// const update = () => {
//   const state = (store.getState());
//   console.log(state);
// };

// store.subscribe(update);

// const withdrawBtn = document.getElementById('withdraw');
// const depositBtn = document.getElementById('deposit');

// withdrawBtn.addEventListener('click', () =>
// store.dispatch({ type: 'WITHDRAW-MONEY', payload: '5000' }));
// depositBtn.addEventListener('click', () =>
// store.dispatch({ type: 'DEPOSIT-MONEY', payload: '10000' }));
