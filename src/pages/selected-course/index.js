/* eslint max-lines: ["error", 2000] */
import React, { Component } from 'react';
import '../add-course/add-course.scss';
import { trans, createGuid } from '../../utils';
import Button from '../../views/button';
import history from '../../routes/history';

export class SelectedCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseData: (this.props.location && this.props.location.courseData) ? this.props.location.courseData : [],
      groupTitle: (props.location && 'details' in props.location) ? props.location.details.organization : '',
    };

    if (!this.props.location.courseData) {
      const { match: { params } } = props;

      history.push({
        pathname: `/admin/manage-accounts/${params.institueId}/course-management`,
      });
    }
  }

    onClickNextHandler = () => {
      const { match: { params } } = this.props;

      history.push({
        details: { organization: this.state.groupTitle },
        institute: 'Test',
        pathname: `/admin/manage-accounts/${params.institueId}/create-license`,
      });
    }

    onClickBackHandler = () => {
      const { match: { params } } = this.props;

      history.push({
        courseData: this.state.courseData,
        details: { organization: this.state.groupTitle },
        pathname: `/admin/manage-accounts/${params.institueId}/course-management`,
      });
    }

    toggleSelectedCourseSelection = (item) => {
      const data = [ ...this.state.courseData ];
      const currentObj = data.findIndex((obj) => obj.id === item.id);
      const isSelectedCourseOpen = !data[currentObj].isSelectedCourseOpen;

      this.setState({
        courseData: this.state.courseData.map((el) => (el.id === item.id ? {
          ...el,
          isSelectedCourseOpen
        } : el))
      });
    }

    handleSelectedCoursesLevelClick = () => {
      const { match: { params } } = this.props;

      history.push({
        courseData: this.state.courseData,
        details: { organization: this.state.groupTitle },
        pathname: `/admin/manage-accounts/${params.institueId}/theme-course/${createGuid()}`,
      });
    }

    customCourseNameWithLevel = (item) => {
      let customCourseNamewithLevel = ' (';

      if (item.levels.length > 0) {
        item.levels.map((obj, index) => {
          if (index === 0) {
            customCourseNamewithLevel += obj.text;
          }
          if (index === item.levels.length - 1) {
            customCourseNamewithLevel += `${obj.text.replace('Level ', ' - ')})`;
          }
          return customCourseNamewithLevel;
        });
      }
      return customCourseNamewithLevel;
    }

    render() {
      const {
        courseData,
      } = this.state;

      const SelectedCourseItems = courseData && courseData.length && (
        courseData.filter((obj) => obj.isChecked).map((item, index) => (
          <div className='accord-heading' key={ `selected_course${index}` }>
            <div className='accord-label'>
              <span>{item.text} {item.isCustomCourse && this.customCourseNameWithLevel(item)}</span>
              <img alt='arrow' onClick={ () => this.toggleSelectedCourseSelection(item) }
                className={ `${item.isSelectedCourseOpen === true ? 'accord-img-up' : 'accord-img-down'}` }
                src={ require('../../assets/images/manage-accounts/manage-accounts-add-course-arrow.svg') }/>
            </div>
            {item.isSelectedCourseOpen &&
            <div className="accord-down">
              <ul className='accord-down__ul'>
                {
                  item.levels && item.levels.length && (
                    item.levels.map((inneritem, innerindex) => (
                      <li className='accord-down__li' key={ `innerselectedcourse-${innerindex}` }>
                        <div className="label">{inneritem.text}</div>
                        <img alt='arrow'
                          onClick={ () => this.handleSelectedCoursesLevelClick(inneritem) }
                          className='img-right-arrow'
                          src={ require('../../assets/images/learner/performance/yellow-right-arrow.svg') }/>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>
            }
          </div>
        ))
      );

      return (
        <div className='add-course-container'>
          <div className='add-course-container__selected-courses'>
            <div className="accord">
              <h4 className='accord__h4'>{trans('Course Management')}</h4>
              <div
                className="accord__select-course">{trans('Click on the courses to manage and customize tasks')}</div>
            </div>
            {SelectedCourseItems}
          </div>
          <div className="btns">
            <Button
              text={ trans('back') }
              classname={ 'btn-back' }
              clickHandler={ this.onClickBackHandler }
            />
            <Button
              text={ trans('next') }
              classname={ 'btn-outlined' }
              clickHandler={ this.onClickNextHandler }
            />
          </div>
        </div>
      );
    }
}

export default SelectedCourse;
