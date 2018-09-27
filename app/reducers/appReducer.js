const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  login: {
    fetching: false,
    fetched: false,
    authenticated: false
  },
  authenticated: false,
  student: {},
  locations: [],
    config: {
    LOCATION_HEADINGS: [],
        DEFAULT_LOCATION: ''
    },
    calendar: [],
    house: {}
};
export default function reducer(state = initialState, action){
  switch(action.type){
    case "AUTHENTICATE_STUDENT":
      return {...state, login: {...state.login, fetching: true, fetched: false}};
    case "AUTHENTICATE_STUDENT_FULFILLED":
      return {...state, login: {...state.login, fetching: false, fetched: true, authenticated: true}};
    case "AUTHENTICATE_STUDENT_DENIED":
      return {...state, login: {...state.login, fetching: false, fetched: true, authenticated: false}};
    case "AUTHENTICATE_STUDENT_REJECTED":
      return {...state, login: {...state.login, fetching: false, error: action.payload}};

      case "READ_STUDENT":
      return {...state, fetching: true, fetched: false};
    case 'READ_STUDENT_FULFILLED':
      return {...state, fetching: false, student: action.payload, authenticated: true};
    case 'READ_STUDENT_EMPTY':
      return {...state, fetching: false, fetched: true, student: {}, authenticated: false, login: initialState.login };
    case "READ_STUDENT_REJECTED":
      return {...state, fetching: false, fetched: true, error: action.payload};

    case "READ_STUDENT_MAJOR":
      return state;
    case "READ_STUDENT_MAJOR_REJECTED":
      return {...state, error: action.payload};
    case "READ_STUDENT_MAJOR_FULFILLED":
      return {...state, student: action.payload};

    case "READ_STUDENT_MINOR":
      return state;
    case "READ_STUDENT_MINOR_REJECTED":
      return {...state, error: action.payload};
    case "READ_STUDENT_MINOR_FULFILLED":
      var newStudent = action.payload;
      var student = Object.assign({}, state).student;
      student.location = newStudent.location;
      student.timelastout = newStudent.timelastout;
      return {...state, student: student};

    case "READ_LOCATIONS":
      return {...state, fetching: true};
    case "READ_LOCATIONS_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "READ_LOCATIONS_FULFILLED":
      return {...state, fetching: false, locations: action.payload};

    case "UPDATE_LOCATION":
      return state;
    case "UPDATE_LOCATION_REJECTED":
      return {...state, error: action.payload};
    case "UPDATE_LOCATION_FULFILLED":
      return {...state, student: action.payload};

      case "LOGOUT_STUDENT":
          return {...state, fetching: true};
      case "LOGOUT_STUDENT_REJECTED":
          return {...state, fetching: false, error: action.payload};
      case "LOGOUT_STUDENT_FULFILLED":
          return {...initialState, fetched: true};

      case "GET_HOUSE_CONFIG":
          return {...state, fetching: true, fetched: false};
      case "GET_HOUSE_CONFIG_REJECTED":
          return {...state, fetching: false, error: action.payload};
      case "GET_HOUSE_CONFIG_FULFILLED":
        return {...state, fetching: false, fetched: true, config: action.payload.config, house: action.payload};

      case "READ_CALENDAR":
        return {...state, fetching: true};
      case "READ_CALENDAR_REJECTED":
        return {...state, fetching: false, error: action.payload};
      case "READ_CALENDAR_FULFILLED":
        return {...state, fetching: false, calendar: action.payload};


      default:
      return state;
  }
}
