import React, { Suspense, Component } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import Routes from './routes';
import Loader from './views/loader';
import { set } from './utils/localCache';
import Constant from './constants';
import brandConfig from './brands/brandConfig.json';
import history from './routes/history';
import store from './store';
import FlashMessage from './views/flash-message';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    const urlParams = new URLSearchParams(window.location.search);
    const brandName = urlParams.get('brand') ? urlParams.get('brand') : 'oae';

    if (brandConfig[brandName]) {
      set('brandConfig', JSON.stringify(brandConfig[brandName]));
    } else {
      history.push(window.location.pathname);
    }
  }

  componentDidMount() {
    // Loading the Translation file
    const { TRANSLATION_URL } = Constant;

    axios.get(TRANSLATION_URL)
      .then((response) => {
        if (response.data) {
          const { data } = response;

          if (localStorage.lng === undefined || localStorage.lng === "undefined") {
            localStorage.lng = data.default.split("-")[0] || 'en';
          }
          set('LANGUAGE_PACK', data);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('unable to load translation', error);
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading } = this.state;
    const startApp = () => {
      if (isLoading) {
        return (
          <Loader />
        );
      }

      return (
        <Suspense fallback={ <Loader /> }>
          <Provider store={ store }>
            <Routes />                     
            <FlashMessage/>
          </Provider>
        </Suspense>
      );
    };

    return startApp();
  }
}

export default App;
