export function selectChoice(option) {
  console.log('in action creator');
  //here I would make axios get to db
  if (option === 'restaurant') {
  return {
    type: 'CHOICES_SELECTED',
    payload: [{ img : 'http://www.peabody.k12.ma.us/cms/lib01/MA01001873/Centricity/Domain/1013/italian_flag_behind_a_smiling_chef_with_a_pizza.jpg', option: 'Italian' },
               { img: 'http://mustseeplaces.eu/wp-content/uploads/2016/11/asian-food-1.jpg', option: 'Asian' } 
               ]
  };
 } else {
  return {
    type: 'CHOICES_SELECTED',
    payload: [{ img : 'http://www.peabody.k12.ma.us/cms/lib01/MA01001873/Centricity/Domain/1013/italian_flag_behind_a_smiling_chef_with_a_pizza.jpg', option: 'Italian' },
               { img: 'http://mustseeplaces.eu/wp-content/uploads/2016/11/asian-food-1.jpg', option: 'Asian' } 
               ]
  };

 }
} 


//axios calls go in here NOT in the reducers

