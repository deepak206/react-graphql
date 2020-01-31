import React, { Component } from 'react';
import { string, array } from 'prop-types';
// import CircularChart from '../circular-chart';
import CircleChart from '../circle-chart';
import history from '../../routes/history';
import CONSTANT from '../../constants';

import './skill-list.scss';

export class SkillCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTaskClick = (linkTo) => {
    history.push({
      pathname: `${linkTo}`,
    });
  }

  SkillCard = () => {
    const { data, type, color } = this.props;

    return data && data.length && (
      data.map((item, index) => (
        <div className='skill-list-container__performance-tile' key={ index }>
          <div className='skill-list-container__performance-tile_left-icon'>
            {/* <CircularChart percentage={ item.percentage } { ...this.props } /> */}
            <div className='skill-list-container__performance-tile_left-icon_chart'>
              <CircleChart
                percentageValue={ item.percentage }
                strokeWidth={ 5 }
                pathStroke={ type==='strong' ? color : CONSTANT.CIRCLE_CHART_PATH_STROKE_COLOR_2 }
                radius={ 32 }
                index={ 1 }
                height={ 100 }
                width={ 100 }
                showText={ true }
                textAttributes={ {
                  fill: type==='strong' ? color : CONSTANT.CIRCLE_CHART_TEXT_COLOR_2,
                  fontSize: 16,
                  fontWeight: 600,
                } }
                xaxis={ 40 }
                yaxis={ 40 }
              />
            </div>
          </div>
          <div className='skill-list-container__performance-tile_content'>
            { item.content }
          </div>
          <div className='skill-list-container__performance-tile_right-icon'>
            <img className="skill-list-container__performance-tile_right-icon_image"
              src={ require('../../assets/images/learner/performance/yellow-right-arrow.svg') } alt="img"
              onClick={ () => this.handleTaskClick(item.linkTo) }></img>
          </div>
        </div>
      )
      ))};

  render() {
    return (
      this.SkillCard()
    );
  }
}

SkillCard.propTypes = {
  data: array,
  type: string,
};

SkillCard.defaultProps = {
  type: 'strong',
};

export default SkillCard;
