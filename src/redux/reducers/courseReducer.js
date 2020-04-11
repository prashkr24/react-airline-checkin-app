export default function courseReducer(state=[],action){
  console.log('reducer',action);
  switch(action.type){
    case "CREATE_COURSE":
      return [...state,{...action.course}]
    default: 
      return state;
  }
} 