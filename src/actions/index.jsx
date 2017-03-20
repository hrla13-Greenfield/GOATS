
import axios from 'axios';
import * as UserActions from './UserActions.js';

let data;
let selection;
let selection1;
let selection2;
let selection3;
let selection4;
let selection5;
let selection6;

export function submitLocation(zip) {
  return {
    type: 'ZIP_SUBMITTED',
    payload: zip,
  };
}

export function getData(selection) {
  return {
    type: 'FINAL_SELECTED',
    payload: [
      { name: selection.name,
        image: selection.image_url,
        phone: selection.display_phone,
        distance: selection.distance,
        description: selection.categories,
        url: selection.url,
        address: selection.location.display_address },
    ],
  };
}

export function getDay(selection1) {
  return {
    type: 'DAY_SELECTED',
    payload: [
      { name: selection1.name,
        image: selection1.image_url,
        phone: selection1.display_phone,
        distance: selection1.distance,
        description: selection1.categories,
        url: selection1.url },
    ],
  };
}

export function getDay2(selection2) {
  return {
    type: 'DAY_SELECTED2',
    payload: [
      { name: selection2.name,
        image: selection2.image_url,
        phone: selection2.display_phone,
        distance: selection2.distance,
        description: selection2.categories,
        url: selection2.url },
    ],
  };
}

export function getDay3(selection3) {
  return {
    type: 'DAY_SELECTED3',
    payload: [
      { name: selection3.name,
        image: selection3.image_url,
        phone: selection3.display_phone,
        distance: selection3.distance,
        description: selection3.categories,
        url: selection3.url },
    ],
  };
}

export function getDay4(selection4) {
  return {
    type: 'DAY_SELECTED4',
    payload: [
      { name: selection4.name,
        image: selection4.image_url,
        phone: selection4.display_phone,
        distance: selection4.distance,
        description: selection4.categories,
        url: selection4.url },
    ],
  };
}

export function getDay5(selection5) {
  return {
    type: 'DAY_SELECTED5',
    payload: [
      { name: selection5.name,
        image: selection5.image_url,
        phone: selection5.display_phone,
        distance: selection5.distance,
        description: selection5.categories,
        url: selection5.url },
    ],
  };
}
export function getDay6(selection6) {
  return {
    type: 'DAY_SELECTED6',
    payload: [
      { name: selection6.name,
        image: selection6.image_url,
        phone: selection6.display_phone,
        distance: selection6.distance,
        description: selection6.categories,
        url: selection6.url },
    ],
  };
}

export function getAll(data) {
  return {
    type: 'BROWSE',
    payload: { data },
  };
}

export function goBack() {
  return {
    type: 'GOBACK',
  };
}

export function selectChoice(option, zip, userID, username) {
  if (option === 'food') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: './assets/breakfast.jpg', option: 'breakfast' },
      { img: './assets/dinner.jpg', option: 'lunch/dinner' },
      { img: './assets/Idkgoat.png', option: 'anyfood' },
      ],
    };
  } else if (option === 'party') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: './assets/bar.jpg', option: 'bar' },
      { img: './assets/club.jpg', option: 'club' },
      { img: './assets/lounge.jpg', option: 'lounge' },
      { img: './assets/Idkgoat.png', option: 'anyparty' },
      ],
    };
  } else if (option === 'sports') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: './assets/extreme.jpg', option: 'extreme' },
      { img: './assets/chill.jpg', option: 'chill' },
      { img: './assets/Idkgoat.png', option: 'anysports' },
      ],
    };
  } else if (option === 'relax') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: './assets/body&mind.jpg', option: 'body&mind' },
      { img: './assets/getout.jpg', option: 'getOut' },
      { img: './assets/Idkgoat.png', option: 'anyrelax' },
      ],
    };
  } else if (option === 'activity') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: './assets/entertain.jpg', option: 'entertainment' },
      { img: './assets/daredevil.jpg', option: 'daredevil' },
      { img: './assets/Idkgoat.png', option: 'anyactivity' },
      ],
    };
  // server calls
  } else if (option === 'breakfast') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'food', filter: 'coffee', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'lunch/dinner') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'food', filter: 'restaurants', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'bar') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'bars', filter: 'bars', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'club') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'clubs', filter: 'danceclubs', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'lounge') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'lounge', filter: 'lounges', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'extreme') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'sports', filter: 'boxing,bootcamps,martialarts,flyboarding,hanggliding,horseracing,mountainbiking,rafting,rock_climbing,kiteboarding,diving', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'chill') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'fitness', filter: 'tennis,golf,yoga,gyms,hiking,horsebackriding,pilates', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'body&mind') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'beauty', filter: 'beautysvc', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'getOut') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'active', filter: 'farms,parks,beaches,shoppingcenters', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'entertainment') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'arts', filter: 'museums,opera,theater,wineries,winetastingrooms,galleries,movietheaters,zoos,amusementparks,fleamarkets,zoos,planetarium, festivals', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'daredevil') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'active', filter: 'bungeejumping,hot_air_balloons,jetskis,ziplining,gokarts,paintball', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'any') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: '', filter: 'bungeejumping,hot_air_balloons,jetskis,ziplining,gokarts,paintball,museums,opera,theater,wineries,winetastingrooms,galleries,movietheaters,zoos,amusementparks,fleamarkets,zoos,planetarium,farms,parks,beaches,shoppingcenters,beautysvc,tennis,golf,yoga,gyms,hiking,horsebackriding,pilates,boxing,bootcamps,martialarts,flyboarding,hanggliding,horseracing,mountainbiking,rafting,rock_climbing,kiteboarding,diving,launches,danceclubs,bars,festivals', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyfood') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'food', filter: 'restaurants', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input);
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyparty') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'clubs', filter: 'nightlife', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anysports') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'fitness', filter: 'fitness', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyrelax') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'spa', filter: 'beautysvc', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  } else if (option === 'anyactivity') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'entertainment', filter: 'arts', zip },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((results) => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        const input = { selection,
          userID };
        axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        });
      })
      .catch((err) => {
        console.error(err);
      });
    };
  }
}

export function planDay(zip) {
  return (dispatch) => {
    axios.get('api/getActivities', { params: {
      term: 'breakfast', filter: 'restaurants', zip },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((results) => {
        data = results.data.businesses;
        selection1 = data[Math.floor(Math.random() * data.length)];
        dispatch(getDay(selection1));
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get('api/getActivities', { params: {
      term: 'spa', filter: 'beautysvc', zip },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((results) => {
        data = results.data.businesses;
        selection2 = data[Math.floor(Math.random() * data.length)];
        dispatch(getDay2(selection2));
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get('api/getActivities', { params: {
      term: 'food', filter: 'restaurants', zip },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((results) => {
        data = results.data.businesses;
        selection3 = data[Math.floor(Math.random() * data.length)];
        dispatch(getDay3(selection3));
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get('api/getActivities', { params: {
      term: 'fitness', filter: 'fitness', zip },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((results) => {
        data = results.data.businesses;
        selection4 = data[Math.floor(Math.random() * data.length)];
        dispatch(getDay4(selection4));
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get('api/getActivities', { params: {
      term: 'food', filter: 'restaurants', zip },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((results) => {
        data = results.data.businesses;
        selection5 = data[Math.floor(Math.random() * data.length)];
        dispatch(getDay5(selection5));
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get('api/getActivities', { params: {
      term: 'clubs', filter: 'nightlife', zip },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((results) => {
        data = results.data.businesses;
        selection6 = data[Math.floor(Math.random() * data.length)];
        dispatch(getDay6(selection6));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function browse(zip, offset) {
  return (dispatch) => {
    axios.get('api/getActivities', { params: {
      term: 'fun', filter: 'bungeejumping,hot_air_balloons,jetskis,ziplining,gokarts,paintball,museums,opera,theater,wineries,winetastingrooms,galleries,movietheaters,zoos,amusementparks,fleamarkets,zoos,planetarium,farms,parks,beaches,shoppingcenters,beautysvc,tennis,golf,yoga,gyms,hiking,horsebackriding,pilates,boxing,bootcamps,martialarts,flyboarding,hanggliding,horseracing,mountainbiking,rafting,rock_climbing,kiteboarding,diving,launches,danceclubs,bars,festivals, restaurants', zip, offset },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then((results) => {
        data = results.data.businesses;
        dispatch(getAll(data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function wantToDo(item, userID, username) {
  return (dispatch) => {
    const input = { selection: item,
      userID };
    axios.post('api/users/history', input)
        .then(() => {
          dispatch(UserActions.signIn(username));
        })
      .catch((err) => {
        console.error(err);
      });
  };
}

