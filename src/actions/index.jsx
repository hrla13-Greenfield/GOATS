
import axios from 'axios';

let data;
let selection;

export function submitLocation(zip){
  console.log('this works', zip)
  return {
    type: 'ZIP_SUBMITTED',
    payload: zip,
  }
}

export function getData(selection) {
  return {
    type: 'FINAL_SELECTED',
    payload: [
      { name: selection.name,
        image: selection.image_url,
        phone: selection.display_phone,
        distance: selection.distance },
    ],
  };
}
export function selectChoice(option, zip) {
  if (option === 'food') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'http://www.maturetimes.co.uk/wp-content/uploads/2013/10/breakfast-including-coffee-honey-848x478.jpg', option: 'breakfast' },
      { img: 'https://cpplymouth.com/up/Creekside_event_table_setting_with_salmon_dinner_and_wine.jpg', option: 'lunch/dinner' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'anyfood' },
      ],
    };
  } else if (option === 'party') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'https://i.ytimg.com/vi/CX8Uuynkppw/maxresdefault.jpg', option: 'bar' },
      { img: 'https://s-media-cache-ak0.pinimg.com/originals/42/26/8a/42268a15745703bbff25a4ca2e7e461b.jpg', option: 'club' },
      { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTpwzRlQlQemkHCfO4JA4yYbGX_tnStjZLPxRnaMaIcjTeGq0N', option: 'lounge' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'anyparty' },
      ],
    };
  } else if (option === 'sports') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'https://indonesia.tripcanvas.co/bali/wp-content/uploads/2015/02/kitesurfing21.jpg', option: 'extreme' },
      { img: 'http://caffeyoga.com/wp-content/uploads/2016/01/beach-yoga1.jpg', option: 'chill' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'anysports' },
      ],
    };
  } else if (option === 'relax') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'http://bhubaneswarlive.com/wp-content/uploads/2017/01/spa-services-in-bhubaneswar.jpg', option: 'body&mind' },
      { img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQlBVJ8BIMYMBvtYycyIWcH4fQ-GLJ2eal2tLfDcYWfTQiaPURd3w', option: 'getOut' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'anyrelax' },
      ],
    };
  } else if (option === 'activity') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'http://www.visitcalifornia.com/sites/default/files/styles/welcome_image/public/VCW_D_SantaCruz_T2_Lisa_7547806186_6171c42b54_o_1280x642.jpg', option: 'entertainment' },
      { img: 'http://www.travelinsurance.org/wp-content/uploads/2009/11/skydiving.jpg', option: 'daredevil' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'anyactivity' },
      ],
    };
  // server calls
  } else if (option === 'breakfast') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'food', filter: 'coffee', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        console.log(selection, '+++++++++');
        dispatch(getData(selection));
        axios.post('api/users/history', selection);
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'lunch/dinner') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'food', filter: 'restaurants', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'bar') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'bars', filter: 'bars', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'club') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'clubs', filter: 'danceclubs', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'lounge') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'lounge', filter: 'lounges', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'extreme') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'sports', filter: 'boxing,bootcamps,martialarts,flyboarding,hanggliding,horseracing,mountainbiking,rafting,rock_climbing,kiteboarding,diving', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'chill') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'fitness', filter: 'tennis,golf,yoga,gyms,hiking,horsebackriding,pilates', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'body&mind') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'beauty', filter: 'beautysvc', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'getOut') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'active', filter: 'farms,parks,beaches,shoppingcenters', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'entertainment') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'arts', filter: 'museums,opera,theater,wineries,winetastingrooms,galleries,movietheaters,zoos,amusementparks,fleamarkets,zoos,planetarium, festivals', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'daredevil') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'active', filter: 'bungeejumping,hot_air_balloons,jetskis,ziplining,gokarts,paintball', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'any') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: '', filter: 'bungeejumping,hot_air_balloons,jetskis,ziplining,gokarts,paintball,museums,opera,theater,wineries,winetastingrooms,galleries,movietheaters,zoos,amusementparks,fleamarkets,zoos,planetarium,farms,parks,beaches,shoppingcenters,beautysvc,tennis,golf,yoga,gyms,hiking,horsebackriding,pilates,boxing,bootcamps,martialarts,flyboarding,hanggliding,horseracing,mountainbiking,rafting,rock_climbing,kiteboarding,diving,launches,danceclubs,bars,festivals', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyfood') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'food', filter: 'restaurants', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        console.log('results.data.businesses', results.data.businesses);
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyparty') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'clubs', filter: 'nightlife', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anysports') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'fitness', filter: 'fitness', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyrelax') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'spa', filter: 'beautysvc', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyactivity') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'entertainment', filter: 'arts', zip: zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
      })
      .catch((err) => {
        console.error(err);
      });
    };
  }
}
