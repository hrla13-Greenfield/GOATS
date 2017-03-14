
import axios from 'axios';

let data;
let selection;

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


export function selectChoice(option) {
  if (option === 'food') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'http://www.maturetimes.co.uk/wp-content/uploads/2013/10/breakfast-including-coffee-honey-848x478.jpg', option: 'breakfast' },
      { img: 'https://cpplymouth.com/up/Creekside_event_table_setting_with_salmon_dinner_and_wine.jpg', option: 'lunch/dinner' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'any' },
      ],
    };
  } else if (option === 'party') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'https://i.ytimg.com/vi/CX8Uuynkppw/maxresdefault.jpg', option: 'bar' },
      { img: 'https://s-media-cache-ak0.pinimg.com/originals/42/26/8a/42268a15745703bbff25a4ca2e7e461b.jpg', option: 'club' },
      { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTpwzRlQlQemkHCfO4JA4yYbGX_tnStjZLPxRnaMaIcjTeGq0N', option: 'lounge' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'any' },
      ],
    };
  } else if (option === 'bar') {
    return (dispatch) => {
      axios.get('api/getBars')
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
  } else if (option === 'club') {
    return (dispatch) => {
      axios.get('api/getClubs')
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
  } else if (option === 'lounge') {
    return (dispatch) => {
      axios.get('api/getActivities', { params: {
        term: 'lounge', filter: 'lounges', zip: '90024' },
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
  }
}
