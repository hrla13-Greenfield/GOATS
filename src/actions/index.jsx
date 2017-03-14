
import axios from 'axios';
<<<<<<< HEAD

var data;
var selection;

export function getData(selection) {
    return {
      type: 'FINAL_SELECTED',
      payload: [{ name : selection.name, image: selection.image_url, phone: selection.display_phone, distance: selection.distance  },
      ]
    };
}


=======
let data;
>>>>>>> prep to rebase

export function selectChoice(option) {
  console.log('in action creator');
  // here I would make axios get to db
  if (option === 'food') {
    return {
<<<<<<< HEAD
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'http://www.maturetimes.co.uk/wp-content/uploads/2013/10/breakfast-including-coffee-honey-848x478.jpg', option: 'breakfast' },
      { img: 'https://cpplymouth.com/up/Creekside_event_table_setting_with_salmon_dinner_and_wine.jpg', option: 'lunch/dinner' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'any' },
      ]
    };
  } else if (option === 'party') {
    return {
      type: 'CHOICES_SELECTED',
      payload: [{ img: 'https://i.ytimg.com/vi/CX8Uuynkppw/maxresdefault.jpg', option: 'bar' },
      { img: 'https://s-media-cache-ak0.pinimg.com/originals/42/26/8a/42268a15745703bbff25a4ca2e7e461b.jpg', option: 'club' },
      { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTpwzRlQlQemkHCfO4JA4yYbGX_tnStjZLPxRnaMaIcjTeGq0N', option: 'lounge' },
      { img: 'https://abtasty-mtgy74j.netdna-ssl.com/content/uploads/homer-brain-monkey.jpg', option: 'any' },
      ]
    };
  } else if (option === 'bar') {
    return (dispatch) => {
     axios.get('api/getBars')
      .then(results => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        console.log('results.data.businesses', results.data.businesses);
      })
      .catch(err => {
        console.error(err)
      })
    }
  } else if (option === 'club') {
    return (dispatch) => {
     axios.get('api/getClubs')
      .then(results => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        console.log('results.data.businesses', results.data.businesses);
      })
      .catch(err => {
        console.error(err)
      })
    }
  } else if (option === 'lounge') {
    return (dispatch) => {
     //var categories = {term: 'lounge', filter: 'lounges', zip: '90024'};
     //console.log(categories, '+++++++++++++++++')
     axios.get('api/getActivities', {term: 'lounge', filter: 'lounges', zip: '90024'})
      .then(results => {
        data = results.data.businesses;
        selection = data[Math.floor(Math.random() * data.length)];
        dispatch(getData(selection));
        console.log('results.data.businesses', results.data.businesses);
      })
      .catch(err => {
        console.error(err)
      })
    }
  }






}
  //axios calls go in here NOT in the reducers
=======
    type: 'CHOICES_SELECTED',
    payload: [{ img: 'http://www.peabody.k12.ma.us/cms/lib01/MA01001873/Centricity/Domain/1013/italian_flag_behind_a_smiling_chef_with_a_pizza.jpg', option: 'breakfast' },
               { img: 'http://mustseeplaces.eu/wp-content/uploads/2016/11/asian-food-1.jpg', option: 'lunch/dinner' },
    ],
  };
  } else if (option === 'party') {
   return {
    type: 'CHOICES_SELECTED',
    payload: [{ img: 'https://i.ytimg.com/vi/CX8Uuynkppw/maxresdefault.jpg', option: 'bar' },
               { img: 'https://s-media-cache-ak0.pinimg.com/originals/42/26/8a/42268a15745703bbff25a4ca2e7e461b.jpg', option: 'club' },
    ],
  };
 } else if (option === 'bar') {
   axios.get('api/getBars')
   .then((results) => {
     data = results.data.businesses[0];
     console.log('results.data.businesses', results.data.businesses);
   })
   .catch((err) => {
     console.error(err);
   });
   return {
     type: 'FINAL_SELECTED',
     payload: [{ name: data.name, activity: 'dance' },
     ],
   };
 }


// axios calls go in here NOT in the reducers
}
>>>>>>> prep to rebase
