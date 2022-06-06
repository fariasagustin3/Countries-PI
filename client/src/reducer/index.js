import { 
  GET_ALL_COUNTRIES,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  GET_ACTIVITIES,
  COUNTRY_BY_NAME,
  POST_ACTIVITY,
  GET_DETAILS,
  ORDER_BY_POPULATION
} from "../actions/actionTypes";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  detail: [],
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
      const allActivities = [...state.allCountries]
      const activitiesFiltered = action.payload === 'all' ? allActivities : allActivities.filter((e) => e.activities && e.activities.map((c) => c.name).includes(action.payload))
      return {
        ...state,
        countries: activitiesFiltered
      }
    }
    case ORDER_BY_NAME: {
      let orderedCountries = [...state.countries]
      orderedCountries = orderedCountries.sort(function(a, b) {
        if(a.name < b.name) {
          return action.payload === 'des' ? -1 : 1;
        }
        if(a.name > b.name) {
          return action.payload === 'asc' ? -1 : 1;
        }
        return 0;
      })
      return {
        ...state,
        countries: orderedCountries
      }
    }
    case ORDER_BY_POPULATION: {
      let orderedByPopulation = [...state.countries]
      orderedByPopulation = orderedByPopulation.sort(function(a, b) {
        if(a.population < b.population) {
          return action.payload === 'low' ? -1 : 1
        }
        if(a.population > b.population) {
          return action.payload === 'high' ? -1 : 1
        }
        return 0
      })
      return {
        ...state,
        countries: orderedByPopulation
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
    case GET_DETAILS: {
      return {
        ...state,
        detail: action.payload
      }
    }
    default: return state;
  }
}


export default rootReducer;