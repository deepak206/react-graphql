import React, { Component, Fragment } from 'react';
import SkillsHeader from '../../views/skills-header';
import { trans } from '../../utils';
import MyPerformanceEmptyState from '../../views/my-performance-empty-state';
import CircleChart from '../../views/circle-chart';
import Switch from '../../views/switch';
import SkillList from '../../views/skill-list';
import MyPerformanceSkillChart from './my-performance-skill-chart'
import MyPerformanceSkillRightCard from './my-performance-skill-right-card'
import { connect } from 'react-redux';
import { getPerformanceSkillData } from '../../dispatchers/performance-skill-action-dispatcher';
import Loader from '../../views/loader';

import './my-performance-skill.scss';

const skillsList = [ "Reading", "Listening", "Writing", "Speaking", "Grammar", "Vocabulary" ];

export class MyPerformanceSkill extends Component {
  constructor(props){
    super(props);
    this.state = { isChecked: false };
  }

  componentDidMount() {
    const { match: { params: { levelId } }, getPerformanceSkillData } = this.props;

    getPerformanceSkillData({ levelId });
  }

  handleCourseCheck = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  renderSkillSection = () => {
    const { skillData, match: { params: { levelId, skill } } } = JSON.parse(JSON.stringify(this.props));
    const data = skillData && Object.keys(skillData).length > 0 && skillData.skills.filter((obj) => obj.type === skill);

    return data && data.length > 0 ? (
      data.map((item, index) => (
        <Fragment key={ index }>
          <div className='my-performance-skill__container_card'>
            <div className='my-performance-skill__container_card-left'>
              <div className='my-performance-skill__container_card-left_content'>
                <p className='my-performance-skill__container_card-left_content_title'>
                  { item.averageScore }%
                </p>
                <p className='my-performance-skill__container_card-left_content_sub-title'
                  dangerouslySetInnerHTML={ { __html: trans('Average Reading Score') } }>
                </p>
              </div>
              <div className='my-performance-skill__container_card-left_circular-chart'>
                <CircleChart
                  percentageValue={ item.averageScore }
                  strokeWidth={ 12 }
                  pathStroke={ item.color }
                  radius={ 43 }
                  index={ 1 }
                  xaxis={ 50 }
                  yaxis={ 70 }
                  height={ 100 }
                  width={ 100 }
                  showText={ false }
                />
              </div>
            </div>
            <div className='my-performance-skill__container_card-right'>
              <MyPerformanceSkillRightCard data={ item }/>
            </div>
          </div>
          <div className='my-performance-skill__container_chart-section'>
            <div className='my-performance-skill__container_chart-section_title'>
              { trans('Module Performance Score') }
            </div>
            <div className='my-performance-skill__container_chart-section_switch'>
              <Switch  id='1' fieldAttributes={ {
                onChange: () => this.handleCourseCheck(),
              } }
              isChecked={ this.state.isChecked }/>
            </div>
            <MyPerformanceSkillChart graphData={ !this.state.isChecked ?
              item.graphData.performanceScoreModule
              : item.graphData.performanceScoreLevel }
            graphLabel={ !this.state.isChecked ?
              item.graphData.performanceModule
              : item.graphData.performanceLevel } />
          </div>
          <div className='my-performance-skill__container_performance'>
            <div className='my-performance-skill__container_performance_strong'>
              <SkillList data={ item.strong } header='Strong Performance' type='strong' color={ item.color } />
            </div>
            <div className='my-performance-skill__container_performance_weak'>
              <SkillList data={ item.weak } header='Needs Improvement' type='weak' color={ item.color } />
            </div>
          </div>
        </Fragment>
      )
      )
    ) : <MyPerformanceEmptyState activeLevel={ levelId }/> };

  render () {
    const { isLoading, match: { params: { levelId, skill } }  } = this.props;

    return (
      <div className='my-performance-skill'>
        <SkillsHeader task={ skill } activeLevel={ levelId } skillsList={ skillsList }/>
        <div className='my-performance-skill__container'>
          { isLoading && <Loader /> }
          { this.renderSkillSection() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ performanceSkillState: { skillData, isLoading } }) => ({ skillData, isLoading });

const mapDispatchToProps = (dispatch) => ({
  getPerformanceSkillData: (levelId) => {
    dispatch(getPerformanceSkillData(levelId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPerformanceSkill);
