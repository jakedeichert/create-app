import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { React } from 'utils/component';
import { basePath } from 'constants/app';
import GlobalStyleReset from 'components/ui/GlobalStyleReset';
import HomePage from 'components/pages/Home';
import AboutPage from 'components/pages/About';

const AppRoot = () => (
  <>
    <GlobalStyleReset />
    <BrowserRouter basename={basePath}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </>
);

export default AppRoot;
