import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Main from './main/main';

function TodosPage() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

function NotFoundPage() {
  return <h1>Not Found...</h1>;
}

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/todos" />
      </Route>
      <Route path="/todos" component={TodosPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
