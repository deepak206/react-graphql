/* eslint max-lines: ["error", 2000] */
import React, { Component } from 'react';
import './add-course.scss';
import CheckBox from '../../views/check-box';
import { trans } from '../../utils';
import InputField from '../../views/input-field';
import Button from '../../views/button';
import history from '../../routes/history';

export class AddCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseData: (this.props.location && this.props.location.courseData) ? this.props.location.courseData : [ {
        id: 2,
        isChecked: true,
        isHidden: true,
        isPlacement: false,
        isSelectedCourseOpen: false,
        levels: [ {
          QuizRem: [ {
            id: 1, isChecked: true, text: 'Quiz 1', type: 'quiz',
          },
          {
            id: 2, isChecked: true, text: 'Quiz 2', type: 'quiz',
          },
          {
            id: 3, isChecked: true, text: 'Remediation 1', type: 'remediation',
          },
          {
            id: 4, isChecked: true, text: 'Remediation 2', type: 'remediation',
          },
          {
            id: 5, isChecked: true, text: 'Review Test', type: 'review',
          },
          {
            id: 6, isChecked: true, text: 'Level Test', type: 'level',
          } ],
          id: 1,
          isChecked: true,
          isHidden: false,
          modules: [ {
            id: 1,
            isChecked: true,
            tasks: [
              {
                id: 1,
                outcome: 'Can recognise familiar names, words and very basic phrases on simple notices',
                skill: 'Reading '
              },
              {
                id: 2,
                outcome: `Can understand very basic common classroom instructions.
               Can understand basic questions about personal details if addressed slowly and clearly.`,
                skill: 'Listening',
              },
              {
                id: 3,
                outcome: 'Can give very limited personal information using basic fixed expressions',
                skill: 'Speaking'
              },
              {
                id: 4,
                outcome: 'Can copy familiar words and short phrases about everyday objects and set phrases',
                skill: 'Writing '
              },
              { id: 5, outcome: 'Can use subject personal pronouns', skill: 'Grammer ' },
              { id: 6, outcome: 'Can recognise basic plural forms of nouns.', skill: 'Reading ' },
              { id: 7, outcome: 'Can use the subject personal pronoun with ‘be’', skill: 'Grammer ' },
              {
                id: 8,
                outcome: 'Can use words like hi, little, buy, today and goodbye.',
                skill: 'Vocabulary'
              },
            ],
            text: 'Introducing self before the class',
          },
          {
            id: 2,
            isChecked: true,
            tasks: [
              {
                id: 1,
                outcome: 'Can give very limited information using basic fixed expressions',
                skill: 'Reading '
              },
              {
                id: 2,
                outcome: 'Can recognize familiar names, words, and very basic phrases on simple notices.',
                skill: 'Listening',
              },
              {
                id: 3,
                outcome: 'Can understand  very basic and common instructions.',
                skill: 'Speaking'
              },
              {
                id: 4,
                outcome: 'Can make offers, requests, and suggestions using ‘can’',
                skill: 'Writing'
              },
              {
                id: 5,
                outcome: 'Can copy familiar words and short phrases about everyday objects and set phrases.',
                skill: 'Grammer '
              },
              {
                id: 6,
                outcome: 'Can recognise familiar names, words and very basic phrases on simple notices.',
                skill: 'Reading '
              },
              {
                id: 7,
                outcome: 'Can use words like day, teach, number, and health.',
                skill: 'Grammer '
              },
              {
                id: 8,
                outcome: 'Can make offers, requests, and suggestions using ‘can’',
                skill: 'Vocabulary'
              },
            ],
            text: 'Handling an emergency',
          },
          {
            id: 3,
            isChecked: true,
            tasks: [
              {
                id: 1,
                outcome: 'Can copy familiar words and short phrases about everyday objects and set phrases',
                skill: 'Reading '
              },
              {
                id: 2,
                outcome: 'Can recognize basic plural forms of nouns',
                skill: 'Listening',
              },
              {
                id: 3,
                outcome: 'Can use the words like beautiful, near, office, garden, relax',
                skill: 'Speaking'
              },
              {
                id: 4,
                outcome: 'Can understand basic questions about personal details if addressed slowly and clearly',
                skill: 'Writing '
              },
              {
                id: 5,
                outcome: 'Can form questions with ‘what’ and ‘who’ and answer them',
                skill: 'Grammer '
              },
              {
                id: 6,
                outcome: 'Can recognise familiar names, words and very basic phrases on simple notices.',
                skill: 'Reading '
              },
              {
                id: 7,
                outcome: 'Can give very limited (personal) information using basic fixed expressions',
                skill: 'Grammer '
              },
              {
                id: 8,
                outcome: 'Can form questions with ‘what’ and ‘who’ and answer them.',
                skill: 'Vocabulary'
              },
            ],
            text: 'Mock Drills: Preparing for the World',
          },
          { id: 4, isChecked: true, text: '(Going for a holiday)' },
          { id: 5, isChecked: true, text: 'Describing Food' },
          { id: 6, isChecked: true, text: 'Visiting a Book Fair' },
          { id: 7, isChecked: true, text: 'Learning about search engines' },
          { id: 8, isChecked: true, text: 'Buying Food Items' },
          { id: 9, isChecked: true, text: 'Joining a Film Society/Drama Club (Application Forms)' },
          { id: 10, isChecked: true, text: 'Walking through a Grocery Store' } ],
          text: 'Level 1',
        },
        {
          QuizRem: [ {
            id: 1, isChecked: true, text: 'Quiz 1', type: 'quiz',
          },
          {
            id: 2, isChecked: true, text: 'Quiz 2', type: 'quiz',
          },
          {
            id: 3, isChecked: true, text: 'Remediation 1', type: 'remediation',
          },
          {
            id: 4, isChecked: true, text: 'Remediation 2', type: 'remediation',
          },
          {
            id: 5, isChecked: true, text: 'Review Test', type: 'review',
          },
          {
            id: 6, isChecked: true, text: 'Level Test', type: 'level',
          } ],
          id: 2,
          isChecked: true,
          isHidden: false,
          modules: [ { id: 1, isChecked: true, text: 'Going for shopping in a new city ' },
            { id: 2, isChecked: true, text: 'Meeting new people' },
            { id: 3, isChecked: true, text: 'Game fans' },
            { id: 4, isChecked: true, text: 'Joining a club ' },
            { id: 5, isChecked: true, text: 'Planning a trip' },
            { id: 6, isChecked: true, text: 'Flying to Delhi ' },
            { id: 7, isChecked: true, text: 'Planning a conference' },
            { id: 8, isChecked: true, text: 'Working at a cafeteria' },
            { id: 9, isChecked: true, text: 'A travel agent ' },
            { id: 10, isChecked: true, text: 'Going to a party' } ],
          text: 'Level 2',
        },
        {
          QuizRem: [ {
            id: 1, isChecked: true, text: 'Quiz 1', type: 'quiz',
          },
          {
            id: 2, isChecked: true, text: 'Quiz 2', type: 'quiz',
          },
          {
            id: 3, isChecked: true, text: 'Remediation 1', type: 'remediation',
          },
          {
            id: 4, isChecked: true, text: 'Remediation 2', type: 'remediation',
          },
          {
            id: 5, isChecked: true, text: 'Review Test', type: 'review',
          },
          {
            id: 6, isChecked: true, text: 'Level Test', type: 'level',
          } ],
          id: 3,
          isChecked: true,
          isHidden: false,
          modules: [ {
            id: 1,
            isChecked: true,
            text: 'Discussion between Arun and his father regarding an ingredient in a recipe'
          },
          {
            id: 2,
            isChecked: true,
            text: 'David has to make an animation storyboard, so he collaborates with an animator'
          },
          {
            id: 3,
            isChecked: true,
            text: 'Discussion between a customer and a waiter at a restaurant'
          },
          {
            id: 4,
            isChecked: true,
            text: 'Sumit invites Varun for a weekend trip to Araku Valley with family'
          },
          {
            id: 5,
            isChecked: true,
            text: 'Amrita calls the organiser of a conference on inclusive education that she wants to attend. '
          },
          { id: 6, isChecked: true, text: 'Kriti receives a new project from a client ' },
          {
            id: 7,
            isChecked: true,
            text: 'Students go on a professor-guided tour to University’s Language Lab'
          },
          { id: 8, isChecked: true, text: 'Shreya is undergoing treatment for back pain' },
          {
            id: 9,
            isChecked: true,
            text: 'Sachin’s elder brother gives him tips on applying for his first job'
          },
          { id: 10, isChecked: true, text: 'Shashi gets a new fitness plan' } ],
          text: 'Level 3',
        } ],
        text: 'Foundation (Levels 1 - 3)',
      },
      {
        id: 3,
        isChecked: true,
        isHidden: true,
        isPlacement: false,
        isSelectedCourseOpen: false,
        text: 'Professional (Levels 4 - 6) ',
      },
      {
        id: 4,
        isChecked: false,
        isHidden: true,
        isPlacement: false,
        isSelectedCourseOpen: false,
        text: 'Proficient (Levels 7 - 10)',
      },
      {
        id: 5,
        isChecked: false,
        isHidden: true,
        isPlacement: true,
        isSelectedCourseOpen: false,
        placement: false,
        text: '6 Months (Levels 1 - 10) ',
      },
      {
        id: 6,
        isChecked: false,
        isHidden: true,
        isPlacement: true,
        isSelectedCourseOpen: false,
        placement: false,
        text: '1 Year (Levels 1 - 10) ',
      } ],
      customCourses: [],
      fields: { courseName: '' },
      groupTitle: (props.location && 'details' in props.location) ? props.location.details.organization : '',
      hascourseNameError: true,
      isCustomCourseOpen: false,
      isValidate: false,
      levels: [ {
        id: 1, isChecked: false, isDisabled: false, text: 'Level 1',
      },
      {
        id: 2, isChecked: false, isDisabled: false, text: 'Level 2',
      },
      {
        id: 3, isChecked: false, isDisabled: false, text: 'Level 3',
      },
      {
        id: 4, isChecked: false, isDisabled: false, text: 'Level 4',
      },
      {
        id: 5, isChecked: false, isDisabled: false, text: 'Level 5',
      },
      {
        id: 6, isChecked: false, isDisabled: false, text: 'Level 6',
      },
      {
        id: 7, isChecked: false, isDisabled: false, text: 'Level 7',
      },
      {
        id: 8, isChecked: false, isDisabled: false, text: 'Level 8',
      },
      {
        id: 9, isChecked: false, isDisabled: false, text: 'Level 9',
      },
      {
        id: 10, isChecked: false, isDisabled: false, text: 'Level 10',
      },
      ],
    };
  }

    handleCourseCheck = (item) => {
      const data = [ ...this.state.courseData ];
      const currentObj = data.findIndex((obj) => obj.id === item.id);
      const isChecked = !data[currentObj].isChecked;

      this.setState({ courseData: this.state.courseData.map((el) => (el.id === item.id ? { ...el, isChecked } : el)) });
    }

    handleCustomLevelCheck = (item) => {
      const levels = [ ...this.state.levels ];
      const checkedIndex = levels.findIndex((obj) => obj.id === item.id);

      if (levels[checkedIndex - 1] !== undefined && levels[checkedIndex + 1] !== undefined
            && levels[checkedIndex - 1].isChecked === true && levels[checkedIndex + 1].isChecked === true && item.isChecked === true) {
        return;
      }
      levels[checkedIndex].isChecked = !item.isChecked;
      const checkedCount = levels.filter((obj) => obj.isChecked === true).length;
      const firstCheckedIndex = levels.findIndex((obj) => obj.isChecked === true);

      levels.map((items, indexs) => {
        if (checkedCount === 1 && item.isChecked === true) {
          if (checkedIndex - 1 === indexs || checkedIndex === indexs || checkedIndex + 1 === indexs) {
            levels[indexs].isDisabled = false;
            return levels;
          }
          levels[indexs].isDisabled = true;
        }

        if ((checkedCount >= 2 && item.isChecked === true && (checkedIndex - 1 === indexs || checkedIndex + 1 === indexs)) || checkedCount === 0) {
          levels[indexs].isDisabled = false;
          return levels;
        }

        if (checkedCount >= 1 && item.isChecked === false) {
          if (firstCheckedIndex > checkedIndex && checkedIndex - 1 === indexs) {
            levels[indexs].isDisabled = true;
            return levels;
          }
          if (firstCheckedIndex < checkedIndex && checkedIndex + 1 === indexs) {
            levels[indexs].isDisabled = true;
            return levels;
          }
        }
        return levels;
      });

      this.setState({ ...this.state.levels, levels });
    }

    toggleCustomsection = (isCustomCourse) => {
      let isCustomCourseOpen = { ...this.state.isCustomCourseOpen };

      isCustomCourseOpen = !isCustomCourse;
      const customLevels = [ ...this.state.levels ];

      if (customLevels.length > 0) {
        customLevels.map((item, index) => {
          customLevels[index].isChecked = false;
          customLevels[index].isDisabled = false;
          return customLevels;
        });
      }
      const fields = { courseName: '' };

      this.setState({
        customLevels, fields, hascourseNameError: false, ...this.state.isCustomCourseOpen, isCustomCourseOpen,
      });
    }

    handleLevelCheck = (item, levelitem) => {
      const courseData = [ ...this.state.courseData ];
      const courseIndex = courseData.findIndex((obj) => obj.id === item.id);
      const { levels } = courseData[courseIndex];
      const levelIndex = levels.findIndex((s) => s.id === levelitem.id);

      levels[levelIndex].isChecked = !levelitem.isChecked;
      this.setState({ ...this.state.courseData, courseData });
    }

    handleModuleCheck = (item, levelitem, modulesinneritem) => {
      const courseData = [ ...this.state.courseData ];
      const courseIndex = courseData.findIndex((obj) => obj.id === item.id);
      const { levels } = courseData[courseIndex];
      const levelIndex = levels.findIndex((s) => s.id === levelitem.id);
      const { modules } = levels[levelIndex];
      const moduleIndex = modules.findIndex((s) => s.id === modulesinneritem.id);

      modules[moduleIndex].isChecked = !modulesinneritem.isChecked;
      this.setState({ ...this.state.courseData, courseData });
    }

    handleQuizRemCheck = (item, levelitem, modulesinneritem) => {
      const courseData = [ ...this.state.courseData ];
      const courseIndex = courseData.findIndex((obj) => obj.id === item.id);
      const { levels } = courseData[courseIndex];
      const levelIndex = levels.findIndex((s) => s.id === levelitem.id);
      const { QuizRem } = levels[levelIndex];
      const quizRemIndex = QuizRem.findIndex((s) => s.id === modulesinneritem.id);

      QuizRem[quizRemIndex].isChecked = !modulesinneritem.isChecked;
      this.setState({ ...this.state.courseData, courseData });
    }

    handlePlacementCheck = (item) => {
      const data = [ ...this.state.courseData ];
      const currentObj = data.findIndex((obj) => obj.id === item.id);
      const placement = data[currentObj].isPlacement === true ? !data[currentObj].placement : false;

      this.setState({ courseData: this.state.courseData.map((el) => (el.id === item.id ? { ...el, placement } : el)) });
    }

    toggleHiddenCourse = (item) => {
      const data = [ ...this.state.courseData ];
      const currentObj = data.findIndex((obj) => obj.id === item.id);
      const isHidden = !data[currentObj].isHidden;

      this.setState({ courseData: this.state.courseData.map((el) => (el.id === item.id ? { ...el, isHidden } : el)) });
    }

    toggleHiddenLevels = (item, levelitem) => {
      const courseData = [ ...this.state.courseData ];
      const courseIndex = courseData.findIndex((obj) => obj.id === item.id);
      const { levels } = courseData[courseIndex];
      const levelIndex = levels.findIndex((s) => s.id === levelitem.id);

      levels[levelIndex].isHidden = !levelitem.isHidden;
      this.setState({ ...this.state.courseData, courseData });
    }

    handleChange = (field, e) => {
      const { target } = e;

      const { fields } = this.state;

      fields[field] = target.value;
      this.setState({ fields });
    };

    toggleValidating(isValidate) {
      this.setState({ isValidate });
    }

    onSaveHandler = () => {
      this.toggleValidating(true);

      const { hascourseNameError } = this.state;

      if (!hascourseNameError) {
        // logic here
        let courseData = [ ...this.state.courseData ];
        const customCourses = [ ...this.state.customCourses ];
        const customLevels = [ ...this.state.levels ];
        const courseName = this.state.fields.courseName !== undefined ? this.state.fields.courseName : '';

        courseData = courseData.filter((obj) => obj.text !== courseName);
        const checkedCustomLevels = customLevels.filter((obj) => obj.isChecked);

        if (checkedCustomLevels.length === 0) {
          this.setState({ isCustomLevelsSelectedError: true });
          return;
        }
        let maxid = 0;

        courseData.map((obj) => {
          if (obj.id > maxid) {
            maxid = obj.id;
          }
          return maxid;
        });
        const course = { courseName, id: maxid + 1, levels: customLevels };
        const customDataCourses = {
          id: maxid + 1,
          isChecked: true,
          isCustomCourse: true,
          isHidden: true,
          isPlacement: false,
          levels: checkedCustomLevels,
          text: courseName,
        };

        customCourses.push(course);
        courseData.push(customDataCourses);
        const fields = { courseName: '' };

        this.setState({
          courseData,
          customCourses,
          customLevels,
          fields,
          hascourseNameError: true,
          isCustomCourseOpen: false,
          isCustomLevelsSelectedError: false,
          isValidate: false,
        });
      }
    };

    handleEditCourse = (item) => {
      // logic here
      const customCourses = [ ...this.state.customCourses ];
      const customCourse = customCourses.filter((obj) => obj.id === item.id);
      const fields = { courseName: customCourse[0].courseName };

      this.setState({
        fields,
        hascourseNameError: false,
        isCustomCourseOpen: true,
        isCustomLevelsSelectedError: false,
        isValidate: true,
        levels: customCourse[0].levels,
      });
    }

    onClickNextHandler = () => {
      const { match: { params } } = this.props;

      history.push({
        courseData: this.state.courseData,
        details: { organization: this.state.groupTitle },
        pathname: `/admin/manage-accounts/${params.institueId}/selected-course`,
      });
    }

    onClickCancelHandler = () => {
      const { match: { params } } = this.props;

      history.push({
        details: { organization: this.state.groupTitle },
        pathname: `/admin/manage-accounts/${params.institueId}/assign-admin`,
      });
    }

    render() {
      const {
        courseData, fields: { courseName },
        errors,
        isCustomCourseOpen,
        isCustomLevelsSelectedError,
        isValidate,
        levels,
      } = this.state;

      const courseItems = courseData && courseData.length && (
        courseData.map((item, index) => (
          <div className={ `ac-list ${item.isChecked ? 'as-accordion' : ''}` } key={ index }>
            {/* // Courses section */}
            <div className='ac-list__course-placement'>
              <ul className='ac-list_ul'>
                <li className='ac-list_li'>{item.isChecked && !item.isHidden ?
                  <img alt='arrow-down' onClick={ () => this.toggleHiddenCourse(item) }
                    className='ac-list__img-down'
                    src={ require('../../assets/images/manage-accounts/manage-accounts-add-course-arrow-down.svg') }/>
                  : <img alt='arrow-up' onClick={ () => this.toggleHiddenCourse(item) }
                    className='ac-list__img-up'
                    src={ require('../../assets/images/manage-accounts/manage-accounts-add-course-arrow.svg') }/>}
                </li>
                <li>
                  <CheckBox id={ `course-${item.id}` } fieldAttributes={ {
                    onChange: () => this.handleCourseCheck(item),
                  } }
                  isChecked={ item.isChecked } label={ item.text } isToggleCheckbox={ false }/>
                </li>
                {item.isCustomCourse && <span className='ac-list__edit-custom-course'
                  onClick={ () => this.handleEditCourse(item) }>{trans('Edit Course Name')}</span>}
              </ul>
              {/* Placement section */}
              {item.isPlacement && <CheckBox id={ `placement-${item.id}` } fieldAttributes={ {
                onChange: () => this.handlePlacementCheck(item),
              } }
              isChecked={ item.placement } isToggleCheckbox={ true }/>
              }
            </div>
            {/* Levels Section */}
            {item.isChecked && !item.isHidden && item.levels && item.levels.length > 0
              && item.levels.map((inneritem, innerindex) => (
                <div className={ `${!inneritem.isHidden && inneritem.modules && inneritem.modules.length > 0 ? 'level-module' : 'level-close'}` }
                  key={ `${index}-${innerindex}` }>
                  <ul className="list2 no-border bb level-module__ul">
                    <li className='ac-list_li'>
                      {!inneritem.isHidden && inneritem.modules && inneritem.modules.length > 0
                        ? <img alt='arrow-down'
                          onClick={ () => this.toggleHiddenLevels(item, inneritem) }
                          className='ac-list__img-down'
                          src={ require('../../assets/images/manage-accounts/manage-accounts-add-course-arrow-down.svg') }/>
                        : <img alt='arrow-up'
                          onClick={ () => this.toggleHiddenLevels(item, inneritem) }
                          className='ac-list__img-up'
                          src={ require('../../assets/images/manage-accounts/manage-accounts-add-course-arrow.svg') }/>}
                    </li>
                    <li>
                      <CheckBox id={ `level-${item.id}${inneritem.id}` } isDisabled={ true }
                        fieldAttributes={ {
                          onChange: () => this.handleLevelCheck(item, inneritem),
                        } }
                        isChecked={ inneritem.isChecked } label={ inneritem.text }
                        isToggleCheckbox={ false }/>
                    </li>
                  </ul>
                  {/* // modules, quiz, remedize section */}
                  {
                    item.isChecked && !inneritem.isHidden && inneritem.modules && inneritem.modules.length > 0 ?
                      <div className="chckbox-list">
                        <ul className='chckbox-list__ul'>
                          {/* Modules */}
                          {inneritem.modules.map((modulesinneritem, modulesinnerindex) => (
                            <li className='chckbox-list__li' key={ `m${index}${innerindex}${modulesinnerindex}` }>
                              <CheckBox
                                id={ `module-${item.id}${inneritem.id}${modulesinneritem.id}` }
                                fieldAttributes={ {
                                  onChange: () => this.handleModuleCheck(item, inneritem, modulesinneritem),
                                } }
                                isChecked={ modulesinneritem.isChecked }
                                label={ modulesinneritem.text } isToggleCheckbox={ false }/>
                            </li>
                          ))}
                          {/* Quiz, remediations and tests */}
                          {inneritem.QuizRem.map((modulesinneritem, modulesinnerindex) => (
                            <li className='chckbox-list__li' key={ `q${index}${innerindex}${modulesinnerindex}` }>
                              <CheckBox
                                id={ `quizrem-${item.id}${inneritem.id}${modulesinneritem.id}` }
                                fieldAttributes={ {
                                  onChange: () => this.handleQuizRemCheck(item, inneritem, modulesinneritem),
                                } }
                                isChecked={ modulesinneritem.isChecked }
                                label={ modulesinneritem.text } isToggleCheckbox={ false }
                                isDisabled={ modulesinneritem.type === 'level' }/>
                            </li>
                          ))}
                        </ul>
                      </div> : ''
                  }
                </div>
              ))}
          </div>
        ))
      );

      const levelItems = levels && levels.length && (
        levels.map((item, index) => (
          <div className={ `ac-list ${index === 0 ? 'bt' : 'bb'}` } key={ `customlevels${index}` }>
            <ul className='ac-list_ul'>
              <li className='ac-list_li'><img alt='arrow-plus' className='ac-list__img-up ml23'
                src={ require('../../assets/images/manage-accounts/manage-accounts-add-course-arrow.svg') }/>
              </li>
              <li className='ac-list_li'>
                <CheckBox id={ `customlevel-${item.id}` } fieldAttributes={ {
                  onChange: () => this.handleCustomLevelCheck(item),
                } }
                isChecked={ item.isChecked } label={ item.text } isToggleCheckbox={ false }
                isDisabled={ item.isDisabled }
                classname={ `${item.isDisabled ? 'disabledlevels' : ''}` }/>
              </li>
            </ul>
          </div>
        ))
      );

      return (
        <div className='add-course-container'>
          <div className="add-course-container__form-area">
            <h4 className='add-course-container__form-area_header-title'>{trans('Course Management')}</h4>
            <div className="add-course-container__form-area_select-course pdl">{trans('Select courses')}</div>
            <div className="add-course-container__form-area_course-bar">
              <span>{trans('Course')}</span>
              <span>{trans('Placement Test')}</span>
            </div>
            <div className="add-course-container__form-area_accordion-section">
              {courseItems}
            </div>
          </div>
          {/* Add Custom Course Section */}
          {isCustomCourseOpen === true &&
          <div className="add-course-container__form-area mt30 pb30">
            <h4 className="custom-course-h4">{trans('Customize Course')}</h4>
            <div className="form-gap">
              <div className="form-group col-md-6 inputwidth">
                <InputField
                  label={ trans('Course Name') }
                  errors={ errors }
                  name='courseName'
                  validateOptions={ {
                    check: true,
                    required: true,
                  } }
                  validate={ isValidate }
                  validationCallback={ (res) => this.setState({
                    hascourseNameError: res,
                    isValidate: false
                  }) }
                  fieldAttributes={
                    {
                      maxLength: 100,
                      onChange: this.handleChange.bind(this, 'courseName'),
                      value: courseName || '',
                    }
                  }
                />
              </div>
            </div>
            <div className="add-course-container__form-area_accordion-section mb24 ml23">
              <div className="select-course-custom">{trans('Select Levels')}</div>
              {levelItems}
            </div>
            <Button type="button" clickHandler={ this.onSaveHandler } classname="btn-primary ml23"
              text={ trans('Save') }/>
            {isCustomLevelsSelectedError &&
            <span className='add-course-container__form-area_select-level-error'>
              <img className='add-course-container__form-area_select-level-error_image'
                alt='arrow'
                src={ require('../../assets/images/error.png') }/>
              {trans('Please select a level before saving this course')}
            </span>
            }
          </div>
          }
          {/* Add Course Button */}
          {isCustomCourseOpen === false &&
            <div className="add-course-container__add-course" onClick={ () => this.toggleCustomsection(isCustomCourseOpen) }>
              <span className='add-course-container__add-course_span'>{trans('Add custom course')}</span>
              <img alt='arrow' className='add-course-container__add-course_image'
                src={ require('../../assets/images/manage-accounts/manage-accounts-add-course-icon-plus.png') }/>
            </div>
          }
          <div className="btns">
            <Button
              text={ trans('back') }
              classname={ 'btn-back' }
              clickHandler={ this.onClickCancelHandler }
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

export default AddCourse;
