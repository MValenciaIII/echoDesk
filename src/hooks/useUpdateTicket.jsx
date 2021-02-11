// todo:possible abstraction of store later

// import React, { useState, useReducer } from 'react';
// import fakeTickets from '../fakeTickets.js';

// function ticketReudcer(state, action)

// export default function useUpdateTicket(ticket) {
//   // reducer
//   debugger;
//   let [state, dispatch] = useReducer(
//     (state, action) => {
//       switch (action.type) {
//         case 'SET_PRIORITY': {
//           return { ...state, priority: action.value };
//         }
//         default: {
//           return state;
//         }
//       }
//     },
//     // initial state
//     {
//       ...fakeTickets,
//     }
//   );
//   return [state, dispatch];
// }

// ! From the react docs:
// const initialState = {count: 0};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//     </>
//   );
// }
