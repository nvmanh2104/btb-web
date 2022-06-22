import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SCWBMap from './map'
import ROUTER from '../../constants/router';
;


const PET = () => (
	<Switch>
		<Route path={ROUTER.SCWB.INDEX} component={SCWBMap} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default PET;
