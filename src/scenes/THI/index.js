import React from 'react';
import { Route, Switch } from 'react-router-dom';
import THIMap from './map'
import ROUTER from '../../constants/router';
;


const THI = () => (
	<Switch>
		<Route path={ROUTER.THI.INDEX} component={THIMap} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default THI;
