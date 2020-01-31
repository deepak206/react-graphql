import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourseInstance } from "../../service/data-service";
import history from "../../routes/history";
import { setLocalStorageData, getLocalStorageData, getModuleUrl } from "../../utils";
import LinearProgressBar from "../../views/loader/linear-progress-bar";
import { breadcrumbsValue } from '../../actions/breadcrumbs-action-type';

import './data-loader.scss';

function mapStateToProps(state) {
  return {};
}

class DataLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInstanceId: null,
      levelId: null,
      levelLoaded: false
    }
  }

  createModuleUrl(courseId, levelId) {
    const urlData = {
      courseId,
      levelId
    }

    history.push({
      pathname: getModuleUrl(urlData),
    });
  }

  componentDidMount() {
    const userData  = getLocalStorageData("userData");

    // for removing breadcrumbs
    this.props.breadcrumbsData({});

    // if level is set from dashboard
    if ( localStorage.getItem('levelId') && localStorage.getItem('courseInstanceId')) {
      this.createModuleUrl(localStorage.getItem('courseInstanceId'), localStorage.getItem('levelId'));

      return;
    }

    getCourseInstance(userData.userId).then((data) => {

      const { learner: { course: { course: { id, levels: { edges } } } } } = data;

      this.setState({
        courseInstanceId: id,
        levelId: edges && edges.length ? edges[0].node.id : null,
        levelLoaded: true
      }, () => {this.redirectToModulesGrid()});
    }).catch((error) => {
      console.log('error', error);
    })
  }

  redirectToModulesGrid() {
    const { levelId, courseInstanceId } = this.state;

    setLocalStorageData('levelId', levelId);
    setLocalStorageData('courseInstanceId', courseInstanceId);

    this.createModuleUrl(courseInstanceId, levelId);
  }

  render() {
    return (
      <div className="full-screen-loader">
        <LinearProgressBar/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  breadcrumbsData: (breadcrumbs) => {
    dispatch(breadcrumbsValue(breadcrumbs));
  } });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataLoader);
