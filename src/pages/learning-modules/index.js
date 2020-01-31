import React, { Component } from 'react';
import { connect } from 'react-redux';
import LearnerCard from '../../views/learner-card';
import urlChanger from '../../utils/url-changer';
import { getModulesForLevel } from "../../service/data-service";
import LinearProgressBar from "../../views/loader/linear-progress-bar";
import { breadcrumbsValue } from '../../actions/breadcrumbs-action-type';
import { chain, isEmpty } from 'lodash';
import { getLocalStorageData } from '../../utils';
import { getCasSignature } from "../../service/cas-api.service";

// style sheet for learning modules
import './learner-module.scss';

export class LearningModules extends Component {
  userData  = getLocalStorageData("userData");

  constructor(props) {
    super(props);
    const { match: { params: { params } } } = props;

    // decode the url params
    const { courseId, levelId } = urlChanger.decode(params);

    this.state = {
      courseInstanceId: courseId,
      levelName: '',
      levelId: levelId,
      modules: [],
      levelLoaded: false,
      modulesLoaded: false,
      hmac: ''
    };
  }

  componentDidMount() {
    const { moduleData } = this.props;
    const { levelId } = this.state;

    if (!isEmpty(moduleData) && moduleData.id && moduleData.id === levelId) {

      // load breadcrumbs if data is in store
      this.props.breadcrumbsData({
        description: moduleData.description,
        activeImage: true,
        pageTitle: moduleData.name,
      });
    } else {
      this.props.breadcrumbsData({});
    }

    getCasSignature(this.userData.userId).then((res) => {
      console.log(res);
      this.setState({
        hmac: res
      }, ()=> {
        this.getModuleInfo();
      })
    });
  }

  getModuleInfo() {
    const { moduleData } = this.props;
    const { levelId, hmac } = this.state;

    getModulesForLevel(this.userData.userId, levelId).then(( { learner } ) => {
      const { course: { course } } = learner;

      if (course) {
        const { level } = course;
        // activeLevelDescription: level.description,
        const sortedModules = chain(level.modules.nodes).filter( [ 'type', 'MODULE' ] ).sortBy('orderNumber')
          .map((m) => ({ ...m, 'thumbnailUrl': `${m.thumbnailUrl}${hmac}` })).value();

        if (moduleData.id !== levelId) {
          // breadcrumbs not in store get load from api
          this.props.breadcrumbsData({
            description: level.description,
            activeImage: true,
            pageTitle: level.name,
          });
        }

        this.setState({
          modules: sortedModules,
          levelName: level.name,
          // modules: data.node.nodes.sort((a,b) => (a.orderNumber-b.orderNumber)),
          modulesLoaded: true
        });
      }
    }).catch((error) => {
      console.log('error', error);
    });
  }

  renderData() {
    const { modules, levelId, courseInstanceId, levelName } = this.state;

    const { loginData } = this.props;

    return (
      <div className="learner-card_tiles-container">
        { modules.map((moduleData, key) =>
          <LearnerCard
            // always be module
            cardDetails={ { ...moduleData, label: 'module' } }
            levelName={ levelName }
            key={ key }
            activeLevel={ levelId }
            courseId={ courseInstanceId }
            loginData={ loginData }/>)
        }
      </div>
    )
  }

  renderLoader() {
    return (
      <div className="full-screen-loader">
        <LinearProgressBar/>
      </div>
    )
  }

  render() {
    return (!this.state.levelLoaded && !this.state.modulesLoaded) ? this.renderLoader() : this.renderData();
  }
}

const mapDispatchToProps = (dispatch) => ({
  breadcrumbsData: (breadcrumbs) => {
    dispatch(breadcrumbsValue(breadcrumbs));
  }
});

export default connect((
  {
    authState: { loginData },
    LearnerModuleState: { moduleData }
  },
) => ({ loginData, moduleData }), mapDispatchToProps)(LearningModules);
