import { commitMutation } from "react-relay";
import { fetchQuery } from 'relay-runtime';
import graphql from "babel-plugin-relay/macro";
import environment from "../../relay/environment";
import { getErrorValidationMessage } from '../../utils';
import CONSTANT from '../../constants';

const mutation = graphql`
  mutation institutesAddMutation($Input: CreateInstituteInputInput) {
      createInstitute(createInstituteInput: $Input) {
          instituteId,
          name,    
      }
  }
`;

export const AddInstitutesMutation = (
  name,
  city,
  addressString,
  country,
  callback
) => {
  const variables = {
    Input: {
      name,
      city,
      addressString,
      country
    }
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response) => {
      callback(response);
    },
    onError: (err) => {
      let errMessage;

      try{
        errMessage = JSON.parse(err);
        callback(getErrorValidationMessage(errMessage));
      }
      catch{
        callback({ error: CONSTANT.ERROR_MESSAGE() });
      }
    },
  });
}

const updateMutation = graphql`
  mutation institutesUpdateMutation($Input: UpdateInstituteInputInput, $InstituteId: String ) {
    updateInstitute(
      updateInstituteInput: $Input
      instituteId: $InstituteId
    ) {
      id
      instituteId
    }
  }
`;

export const UpdateInstitutesMutation = (
  name,
  city,
  addressString,
  country,
  instituteId,
  callback
) => {
  const variables = {
    Input: {
      name,
      city,
      addressString,
      country
    },
    InstituteId: instituteId
  };

  commitMutation(environment, {
    mutation: updateMutation,
    variables,
    onCompleted: (response) => {
      callback(response);
    },
    onError: (err) => {
      let errMessage;

      try{
        errMessage = JSON.parse(err);
        callback(getErrorValidationMessage(errMessage));
      }
      catch{
        callback({ error: CONSTANT.ERROR_MESSAGE() });
      }
    },
  });
}

export const getInstituteById = (id) => {
  const variables = { id };

  const query = graphql`
    query institutesEditByIdQuery($id: String!) {
      getInstitute(instituteId: $id) {
        id
        name
        address {
          city
          addressString
          country
        }
      }
    }
  `;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  });
};

export const getAllCities = () => {
  const variables = {};

  const query = graphql`
    query institutesCitiesQuery {
      cities (first: 2000) {
        nodes {
          name
          id
        }
      }
    }
  `;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  });
}

export const getCourseByProductId = () => {
  const variables = {
    id: CONSTANT.PRODUCT_IDENTIFIER
  };

  const query = graphql`
    query institutesProductCourseIdQuery($id: String!) {
      product( productIdentifier: $id ) {
        id
        name
        course {
          name
          id
        }
      }
    }
  `;

  return fetchQuery(environment, query, variables).then((res) => {
    return res;
  });
}

const assignCourseMutation = graphql`
    mutation institutesAssignMutation(
      $productIds: [String]!
      $instituteId: String!
    ) {
      assignProductToInstitute(
        productIds: $productIds
        instituteId: $instituteId
      )
    }
`;

export const assignInstituteToCourse = (instituteId, callback) => {
  const variables = {
    productIds: [ CONSTANT.PRODUCT_IDENTIFIER ],
    instituteId: instituteId
  };

  commitMutation(environment, {
    mutation: assignCourseMutation,
    variables,
    onCompleted: (response) => {
      callback(response);
    },
    onError: (err) => {
      let errMessage;

      try{
        errMessage = JSON.parse(err);
        callback(getErrorValidationMessage(errMessage));
      } catch{
        callback({ error: CONSTANT.ERROR_MESSAGE() });
      }
    },
  });
}
