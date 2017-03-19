
//main purpose of reducers is to update state*/
//http://az616578.vo.msecnd.net/files/2016/03/18/635938589851171129-1119557603_food-buffet-1134498.jpg
//const food = require('../../output/assets/food.jpg');

var initialState = {
  finalSelection: false,
  zipCode: false,
  showAll: [],

  firstLoad: [
    { img: './assets/food.jpg', option: 'food', title: 'food' },
    { img: 'http://www.miamiandbeaches.com/~/media/Images/GMCVB/MiamiAndBeaches/Featured%20Articles/Featured%20Article%20Headers/clubs-101-3-612-x-338.jpg', option: 'party', title: 'party' },
    { img: 'http://www.pkvitality.com/wp-content/uploads/2016/12/accuracy.jpg', option: 'sports', title: 'sports' },
    { img: 'http://s.hswstatic.com/gif/relaxation-quiz-orig.jpg', option: 'relax', title: 'relax' },
    { img: 'https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/dlr/gallery/destinations/disneyland-park/disneyland-gallery25.jpg?21042014145156', option: 'activity', title: 'activity' },
    { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'any', title: 'I have no idea' },
  ],
 /* dayLoad: [
    { name: 'food' },
    { image: 'kale' },
    { phone: 'kale' },
    { distance: 'kale' },
  ],*/
};

  //console.log('in redcucer')

export default function(state = initialState, action) {
  switch(action.type) {
    case 'CHOICES_SELECTED':
    return Object.assign({}, state, {
      firstLoad : action.payload,
    });
    case 'FINAL_SELECTED':
    return Object.assign({}, state, {
      firstLoad : action.payload,
      finalSelection: true,
    });
    case 'ZIP_SUBMITTED':
    return Object.assign({}, state, {
      updatedZipcode: action.payload,
      zipCode: true,
    });
    case 'DAY_SELECTED':
    return Object.assign({}, state, {
      dayLoad: action.payload,
      /*dayLoad2: action.payload,
      dayLoad3: action.payload,
      dayLoad4: action.payload,
      dayLoad5: action.payload,
      dayLoad6: action.payload,*/
    });
    case 'DAY_SELECTED2':
    return Object.assign({}, state, {
      dayLoadtwo: action.payload,
    });
    case 'DAY_SELECTED3':
    return Object.assign({}, state, {
      dayLoadthree: action.payload,
    });
    case 'DAY_SELECTED4':
    return Object.assign({}, state, {
      dayLoadfour: action.payload,
    });
    case 'DAY_SELECTED5':
    return Object.assign({}, state, {
      dayLoadfive: action.payload,
    });
    case 'DAY_SELECTED6':
    return Object.assign({}, state, {
      dayLoadsix: action.payload,
    });
    case 'BROWSE':
    return Object.assign({}, state, {
      showAll: state.showAll.concat(action.payload.data),
    });
  }
  return state;
}

//main purpose of reducers is to update state

