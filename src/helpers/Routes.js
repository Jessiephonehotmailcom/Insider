import React, { useState, useEffect } from 'react';
import { Switch, useHistory, Route, useRoutes } from "react-router-dom";
import ImportFile from "../pages/ImportFile/ImportFile";
import People from "../pages/People/People";
import Layout from "../components/Layout/Layout";
import Toolbar from "../components/Toolbar/Toolbar";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Page404 from '../components/Layout/Page404';
import AddEditLicenses from '../pages/AddEditLicenses/AddEditLicenses';
import AddEditNotes from '../pages/AddEditNotes/AddEditNotes';

import SearchBox from "../components/Header/SearchBar";
import { StoreProvider } from 'easy-peasy';

const RedirectToPilotImagePage = () => {
  const history = useHistory();
  const pilotId = localStorage.getItem('pilotId');

  useEffect(() => {
    if (pilotId) {
      history.push(`/PilotImageERPPage?PilotId=${pilotId}`);
    }
  }, [pilotId, history]);

  return null;
};

function Routes() {
  const storageRoles = localStorage.getItem('roles');
  const pilotId = localStorage.getItem('pilotId');
  const [loading, setLoading] = useState(true);

  const getRoles = async () => {
    setLoading(true);
    await fetch(`/.auth/me`)
      .then(res => {
        res.json().then(resJson => {
          setLoading(false);
          const { clientPrincipal } = resJson;
          console.log(clientPrincipal);
          localStorage.setItem('roles', JSON.stringify(clientPrincipal.userRoles));
          localStorage.setItem('pilotId', JSON.stringify(clientPrincipal.userDetails));
        })
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  if (loading) {
    return null;
  }
  else {
    //console.log('ROUTE PAGE::::::::PilotId :::::::::::: ' + pilotId)
    return (
      <Route>
        {/* <Toolbar> */}
        <Layout>
          <Switch>
            <Route exact path="/">
            </Route>
            {/* <Rout?Se path={['/SearchPa?Sge']} component={SearchBox} />         */}
            <Route exact path="/People" render={(props) => { return <People {...props} />; }}></Route>
            <Route exact path="/AddEditLicenses" render={(props) => { return <AddEditLicenses {...props} />; }}></Route>
            <Route exact path="/AddEditNotes" render={(props) => { return <AddEditNotes {...props} />; }}></Route>
            <Route path='/ImportFile' component={ImportFile} />
            <Route path='/logout' />
            {/* <Route path='/People' component={People} /> */}
            <Route path="*" component={Page404} />
          </Switch>
        </Layout>
        {/* </Toolbar> */}
      </Route>
    );
  }
}

export default Routes;

