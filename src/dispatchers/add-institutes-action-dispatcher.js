import {
  addInstitutesRequested,
  addInstitutesSuccess,
  addInstitutesFailure,
  citiesDataSuccess,
  editDataSuccess,
  editInstitutesRequested,
  courseDataSuccess
} from '../actions/add-institute-action-type';
import { breadcrumbsValue } from '../actions/breadcrumbs-action-type';
import urlChanger from '../utils/url-changer';
import { flashMessageDisplay } from '../actions/flash-message-action';
import history from '../routes/history';
import {
  AddInstitutesMutation,
  getInstituteById,
  UpdateInstitutesMutation,
  getAllCities,
  getCourseByProductId,
  assignInstituteToCourse
} from "../service/mutations/institutes.service";
import Constant from '../constants';

// Adding the institute by field object
export const addInstitutesData = ({ fields: { name, addressString, city, country } }) => (dispatch) => {
  dispatch(addInstitutesRequested());

  try {
    AddInstitutesMutation(name, city, addressString, country, (res) => {
      if(typeof res === 'object' && 'createInstitute' in res && res.createInstitute) {
        assignInstituteToCourse( res.createInstitute.instituteId, (assignRes) => {
          if(typeof assignRes === 'object' && 'assignProductToInstitute' in assignRes && assignRes.assignProductToInstitute) {
            // setting the breadcrumbs
            const breadCrumbObject = {
              breadcrumb: [
                { route: '/admin/manage-institutes', title: 'Manage Accounts' },
                {
                  route: `/admin/manage-institutes/institute/manage-learner/list/${ urlChanger.encode({ instituteId: res.createInstitute.instituteId }) }`,
                  title: res.createInstitute.name
                }
              ],
              textColor: "#5d5d5d",
              backgroundColor: "#ffffff",
              operator: ">",
              fontSize: "14px",
              pageTitle: res.createInstitute.name,
              descriptionColor: "#000000",
              descriptionFontSize: "21px",
              activeClass: true
            };

            dispatch(breadcrumbsValue(breadCrumbObject));

            dispatch(addInstitutesSuccess(res));
            dispatch(flashMessageDisplay({ field: { message: Constant.SUCCESS_MESSAGE, isSuccessMessage: true, isVisible: true } }))
            history.push({ details: { organization: name }, pathname: `/admin/manage-institutes/institute/manage-learner/new/${urlChanger.encode({
              instituteId: res.createInstitute.instituteId
            })}/` });
          } else {
            dispatch(addInstitutesFailure(Constant.ERROR_MESSAGE()));
            dispatch(flashMessageDisplay({ field: { message: assignRes.error, isSuccessMessage: false, isVisible: true } }));
          }
        } );
      } else {
        dispatch(addInstitutesFailure(res.error));
        dispatch(flashMessageDisplay({ field: { message: res.error, isSuccessMessage: false, isVisible: true } }));
      }
    })
  } catch(err) {
    dispatch(addInstitutesFailure(Constant.ERROR_MESSAGE()));
    dispatch(flashMessageDisplay({ field: { message: Constant.ERROR_MESSAGE(), isSuccessMessage: false, isVisible: true } }))
  }
};

// get cities data
export const getCitiesData = () => (dispatch) => {
  getAllCities().then(({ cities }) => {
    dispatch(citiesDataSuccess(cities.nodes));
  }).catch((error) => {
    console.log('Error while fetching cities');
  });
};

// get Course by product
export const getCourseByProduct = () => (dispatch) => {
  getCourseByProductId().then(({ product }) => {
    if (product.name) {
      dispatch(courseDataSuccess(product.name));
    }
  }).catch((error) => {
    console.log('Error while fetching cities');
  });
};

export const getInstituteNameById = (instituteId, type) => (dispatch) => {
  try {
    getInstituteById(instituteId).then((res) => {
      let breadCrumbObject = {};

      if(type === "learner-listing") breadCrumbObject = {
        breadcrumb: [
          { route: '/admin/manage-institutes', title: 'Manage Accounts' },
          {
            route: `/admin/manage-institutes/institute/manage-learner/list/${ urlChanger.encode({ instituteId }) }`,
            title: res.getInstitute.name
          }
        ],
        textColor: "#5d5d5d",
        backgroundColor: "#F5F5F5",
        operator: ">",
        fontSize: "14px",
        pageTitle: null,
        descriptionColor: null,
        descriptionFontSize: null
      };

      if(type === "add-learner")  breadCrumbObject = {
        breadcrumb: [
          { route: '/admin/manage-institutes', title: 'Manage Accounts' },
          {
            route: `/admin/manage-institutes/institute/manage-learner/list/${ urlChanger.encode({ instituteId }) }`,
            title: res.getInstitute.name
          }
        ],
        textColor: "#5d5d5d",
        backgroundColor: "#ffffff",
        operator: ">",
        fontSize: "14px",
        pageTitle: res.getInstitute.name,
        descriptionColor: "#000000",
        descriptionFontSize: "21px",
        activeClass: true
      };
      if(type === "edit-learner")   breadCrumbObject = {
        breadcrumb: [],
        arrowcrumb: [
          {
            route: `/admin/manage-institutes/institute/manage-learner/list/${ urlChanger.encode({ instituteId }) }`,
            title: res.getInstitute.name
          } ],
        textColor: "#5d5d5d",
        backgroundColor: "#ffffff",
        operator: ">",
        fontSize: "14px",
        arrowCrumbTitle: "Learner Management",
        descriptionColor: "#000000",
        descriptionFontSize: "21px",
        activeClass: true
      };

      dispatch(breadcrumbsValue(breadCrumbObject));
    })
  } catch(err) {
    console.log(err);
  }
}

// for getting the institute from Id
export const instituteById = (instituteId) => (dispatch) => {
  dispatch(editInstitutesRequested());
  getInstituteById(instituteId).then(({ getInstitute }) => {
    dispatch(editDataSuccess({
      ...getInstitute.address,
      name: getInstitute.name,
    }));
  }).catch((error) => {
    dispatch(addInstitutesFailure(Constant.ERROR_MESSAGE()));
    dispatch(flashMessageDisplay({ field: { message: Constant.ERROR_MESSAGE(), isSuccessMessage: false, isVisible: true } }))
  });
}

// Update the institute by updatedData and insttiteId
export const updateInstituteData = ({ fields: { name, addressString, city, country } }, instituteId) => (dispatch) => {
  dispatch(addInstitutesRequested());

  try {
    UpdateInstitutesMutation(name, city, addressString, country, instituteId, (res) => {
      if(typeof res === 'object' && 'updateInstitute' in res && res.updateInstitute) {
        console.log(res)
        dispatch(addInstitutesSuccess(res));
        dispatch(flashMessageDisplay({ field: { message: Constant.SUCCESS_MESSAGE, isSuccessMessage: true, isVisible: true } }))
        history.push({ pathname: `/admin/manage-institutes` });
      } else {
        dispatch(addInstitutesFailure(res.error));
        dispatch(flashMessageDisplay({ field: { message: res.error, isSuccessMessage: false, isVisible: true } }))
      }
    })
  } catch(err) {
    dispatch(addInstitutesFailure(Constant.ERROR_MESSAGE()));
    dispatch(flashMessageDisplay({ field: { message: Constant.ERROR_MESSAGE(), isSuccessMessage: false, isVisible: true } }))
  }
}
