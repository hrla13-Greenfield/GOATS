
//main purpose of reducers is to update state*/

var initialState = {
  finalSelection: false,

  firstLoad: [
    { img: 'http://ifthedevilhadmenopause.com/wp-content/uploads/2014/08/sri-santrupti-restaurant-21346657591-1.png', option: 'food' },
    { img: 'http://www.miamiandbeaches.com/~/media/Images/GMCVB/MiamiAndBeaches/Featured%20Articles/Featured%20Article%20Headers/clubs-101-3-612-x-338.jpg', option: 'party' },
    { img: 'http://www.pkvitality.com/wp-content/uploads/2016/12/accuracy.jpg', option: 'sports' },
    { img: 'http://s.hswstatic.com/gif/relaxation-quiz-orig.jpg', option: 'relax' },
    { img: 'https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/dlr/gallery/destinations/disneyland-park/disneyland-gallery25.jpg?21042014145156', option: 'activity' },
    { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'any' },
  ],
};

  //console.log('in redcucer')

export default function(state = initialState, action) {
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

