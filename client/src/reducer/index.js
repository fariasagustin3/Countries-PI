import { 
  GET_ALL_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  GET_ACTIVITIES,
  COUNTRY_BY_NAME,
  POST_ACTIVITY
} from "../actions/actionTypes";

const initialState = {
  countries: [],
  allCountries: [],
  activities: []
}


function rootReducer(state = initialState, action) {
  switch(action.type) {
    // acceder a todos los países de la db
    case GET_ALL_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload
      }
    }
    case GET_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload
      }
    }
    case FILTER_BY_CONTINENT: {
      const allCountries = state.allCountries
      const continentFiltered = action.payload === 'All' ? allCountries : allCountries.filter(e => e.continent === action.payload)
      return {
        ...state,
        countries: continentFiltered
      }
    }
    case FILTER_BY_ACTIVITY: {
      const allActivity = state.allCountries
      const activityFiltered = action.payload === 'All' ? allActivity : allActivity.filter((e) => e.activities?.map(m => m.name).includes(action.payload))
      return {
        ...state,
        countries: activityFiltered 
      }
    }
    case ORDER_BY_NAME: {
      let orderedByName = action.payload === 'asc' ? state.countries.sort(function(a, b) {
        if(a.name > b.name) {
          return 1
        }
        if(b.name > a.name) {
          return -1
        }
        return 0
      }) : state.countries.sort(function(a, b) {
        if(a.name > b.name) {
          return -1
        }
        if(b.name > a.name) {
          return 1
        }
        return 0
      })
      return {
        ...state,
        countries: orderedByName
      }
    }
    case COUNTRY_BY_NAME: {
      return {
        ...state,
        countries: action.payload
      }
    }
    case POST_ACTIVITY: {
      return {
        ...state
      }
    }
    default: return state;
  }
}


export default rootReducer;