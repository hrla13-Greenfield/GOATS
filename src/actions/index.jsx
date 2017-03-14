
import axios from 'axios';
var data;

export function selectChoice(option) {
  console.log('in action creator');
  //here I would make axios get to db
  if (option === 'food') {
  return {
    type: 'CHOICES_SELECTED',
    payload: [{ img : 'http://www.peabody.k12.ma.us/cms/lib01/MA01001873/Centricity/Domain/1013/italian_flag_behind_a_smiling_chef_with_a_pizza.jpg', option: 'breakfast' },
               { img: 'http://mustseeplaces.eu/wp-content/uploads/2016/11/asian-food-1.jpg', option: 'lunch/dinner' } 
               ]
  };
 } else if (option === 'party') {
  return {
    type: 'CHOICES_SELECTED',
    payload: [{ img : 'https://i.ytimg.com/vi/CX8Uuynkppw/maxresdefault.jpg', option: 'bar' },
               { img: 'https://s-media-cache-ak0.pinimg.com/originals/42/26/8a/42268a15745703bbff25a4ca2e7e461b.jpg', option: 'club' }, 
               ]
  };
 } else if (option === 'bar') {
   axios.get('api/getBars')
   .then( results => {
     data = results.data.businesses[0];
     console.log('results.data.businesses', results.data.businesses);
   })
   .catch(err => {
     console.error(err)
   })
   return {
     type: 'FINAL_SELECTED',
     payload: [{ name: data.name, activity: 'dance'}, 
              ]
   };
 }


//axios calls go in here NOT in the reducers

}