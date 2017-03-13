
//main purpose of reducers is to update state*/

var initialState = {
  finalSelection: false,

  firstLoad: [
    { img: 'http://ifthedevilhadmenopause.com/wp-content/uploads/2014/08/sri-santrupti-restaurant-21346657591-1.png', option: 'food' },
    { img: 'http://www.miamiandbeaches.com/~/media/Images/GMCVB/MiamiAndBeaches/Featured%20Articles/Featured%20Article%20Headers/clubs-101-3-612-x-338.jpg', option: 'party' },
  ]
};

  //console.log('in redcucer')

export default function(state = initialState, action) {
  console.log(state);
  console.log('ACTION++++++', action);
  switch(action.type) {
    case 'CHOICES_SELECTED':
    return Object.assign({}, state, {
      firstLoad : action.payload
    });
    case 'FINAL_SELECTED':
    return Object.assign({}, state, {
      firstLoad : action.payload,
      finalSelection: true,
    });
  }
  return state;
}
//main purpose of reducers is to update state

