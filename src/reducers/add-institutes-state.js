import {
  ADD_INSTITUTES_REQUESTED,
  ADD_INSTITUTES_SUCCESS,
  ADD_INSTITUTES_FAILURE,
  EDIT_INSTITUTES_REQUESTED,
  CITIES_DATA_SUCCESS,
  COURSE_DATA_SUCCESS,
  EDIT_DATA_SUCCESS,
  EMPTY_THE_STORE,
} from '../actions/add-institute-action-type';

const initialState = {
  errors: null,
  isLoading: false,
  isPageLoading: false,
  citiesData: {},
  courseData: {},
  fields: {
    // remove when country goes dynamic
    country: 'india'
  }
};

const AddInstitutesState = (state = initialState, {
  payload, type,
}) => {
  switch (type) {
    case ADD_INSTITUTES_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: ''
      };

    case ADD_INSTITUTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ADD_INSTITUTES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };

    case EDIT_INSTITUTES_REQUESTED:
      return {
        ...state,
        isPageLoading: true,
      };

    case EDIT_DATA_SUCCESS:
      return {
        ...state,
        isPageLoading: false,
        fields: {
          ...payload,
          // remove when country goes dynamic
          country: 'india'
        },
      };

    case CITIES_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        citiesData: payload,
      };

    case COURSE_DATA_SUCCESS:
      return {
        ...state,
        courseData: payload
      };

    case EMPTY_THE_STORE:
      return {
        ...state,
        fields: {
          ...initialState.fields
        }
      };

    default:
      return state;
  }
};

export default AddInstitutesState;