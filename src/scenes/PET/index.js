import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PETMap from './map'
import ROUTER from '../../constants/router';
;


const PET = () => (
	<Switch>
		<Route path={ROUTER.PET.INDEX} component={PETMap} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default PET;
