import React from 'react';
import { shallow, mount } from 'enzyme';
import LearnerCard from './index';

const modulesData = {
    "active": true,
    "completeTasks": 0,
    "imageUrl": "module_1.png",
    "moduleId": 1,
    "title": "Introducing self before the class",
    "totalTasks": 8,
    "type": "module"
};

const modulesCompleteData = {
    "active": false,
    "completeTasks": 8,
    "imageUrl": "module_1.png",
    "moduleId": 1,
    "title": "Introducing self before the class",
    "totalTasks": 8,
    "type": "module"
};

const testData = {
    "active": false,
    "completeTest": false,
    "result": {
    "correctAnswers": 0,
    "score": 0,
    "timeTake": "00:00",
    "totalQuestions": 0
    },
    "text": "You’re halfway through! Take the review test to test your skills before unlocking the remaining modules",
    "title": "Review Test",
    "type": "review_test"
};

const quizData = {
    "active": false,
    "completeQuiz": false,
    "score":0,
    "timeTaken": "00:00",
    "type": "quiz"
};

const quizActiveData = {
    "active": true,
    "completeQuiz": false,
    "score":0,
    "timeTaken": "00:00",
    "type": "quiz"
};

const quizCompleteData = {
    "active": false,
    "completeQuiz": true,
    "score":70,
    "timeTaken": "19:00",
    "type": "quiz"
};

const remediationData = {
    "active": false,
    "completeTest": false,
    "text": "Improve your low-performing skills before Review test",
    "title": "Remediation",
    "type": "remediation"
};

const remediationDataActive = {
    "active": true,
    "completeTest": false,
    "text": "Improve your low-performing skills before Review test",
    "title": "Remediation",
    "type": "remediation"
};

const loginMasterData = {
    email:"deepak@pearson.com",
    userType:"learner",
    name:"Deepak Mankotia",
    role: "master"
};

const loginLearnerData = {
    email:"deepak@pearson.com",
    userType:"learner",
    name:"Deepak Mankotia",
    role: "learner"
};

describe('<Learn Card />', () => {
    it('should render module card correctly', () => {
        const modulesDataWrapper = mount(<LearnerCard cardDetails={ modulesData } key={ 1 } activeLevel={ 1 } loginData={ loginLearnerData }/>);

        const moduleTitleBoxLength = modulesDataWrapper.find('.module-card').length;
        expect(moduleTitleBoxLength).toBeGreaterThan(0);

        const moduleLoaderLength = modulesDataWrapper.find('.module-card__num_loader').length;
        expect(moduleLoaderLength).toBeGreaterThan(0);

        
        const cardClickHandler = modulesDataWrapper.find('.clickable');
        cardClickHandler.children().at(0).prop('onClick');

    });

    it('should render module card correctly with all modules accessible to master user', () => {
        const modulesMasterDataWrapper = mount(<LearnerCard cardDetails={ modulesData } key={ 1 } activeLevel={ 1 } loginData={ loginMasterData }/>);

        const moduleTitleIconBox = modulesMasterDataWrapper.find('.module-card__icon-tick-green').length;
        expect(moduleTitleIconBox).toBe(0);

        const moduleClickable = modulesMasterDataWrapper.find('.clickable').length;
        expect(moduleClickable).toBeGreaterThan(0);

        const moduleNumLoader = modulesMasterDataWrapper.find('.module-card__num_loader').length;
        expect(moduleNumLoader).toBe(0);
    });

    it('should render module card without progrss bar', () => {
        const modulesCompleteDataWrapper = mount(<LearnerCard cardDetails={ modulesCompleteData } key={ 1 } activeLevel={ 1 } loginData={ loginLearnerData }/>);

        const modulesCompleteDataLength = modulesCompleteDataWrapper.find('.module-card__num_loader').length;
        expect(modulesCompleteDataLength).toBeNull;
    });

    it('should render test card correctly', () => {
        const wrapper = mount(<LearnerCard cardDetails={ testData } key={ 1 } activeLevel={ 1 } loginData={ loginLearnerData }/>);

        const module = wrapper.find('.test-card').length;
        expect(module).toBeGreaterThan(0);
    });

    it('should not render remediation card', () => {
        const remediation = mount(<LearnerCard cardDetails={ remediationData } key={ 1 } activeLevel={ 1 } />);

        const module = remediation.find('.test-card').length;
        expect(module).toBe(0);
    });

    it('should render remediation card correctly', () => {
        const remediationActive = mount(<LearnerCard cardDetails={ remediationDataActive } key={ 1 } activeLevel={ 1 } />);

        const moduleActive = remediationActive.find('.test-card').length;
        expect(moduleActive).toBeGreaterThan(0);
    });

    it('should render quiz card correctly', () => {
        const wrapper = mount(<LearnerCard cardDetails={ quizData } key={ 1 } activeLevel={ 1 } />);

        const module = wrapper.find('.quiz-card').length;
        expect(module).toBeGreaterThan(0);
    });

    it('should render active quiz card correctly', () => {
        const quizActiveWrapper = mount(<LearnerCard cardDetails={ quizActiveData } key={ 1 } activeLevel={ 1 } />);

        const quizActiveModule = quizActiveWrapper.find('.btn-outlined').length;
        expect(quizActiveModule).toBeGreaterThan(0);
    });

    it('should render complete quiz card correctly', () => {
        const quizCompleteWrapper = mount(<LearnerCard cardDetails={ quizCompleteData } key={ 1 } activeLevel={ 1 } />);

        const quizCompleteModule = quizCompleteWrapper.find('.quiz-card__icon-clock_time-taken').length;
        expect(quizCompleteModule).toBeGreaterThan(0);
    });

    it('should render LearnerCard correctly', () => {
        const card = shallow(
        <LearnerCard cardDetails={ modulesData } key={ 1 } activeLevel={ 1 } loginData={ loginLearnerData }/>
        );
        expect(card).toMatchSnapshot();
    });
})