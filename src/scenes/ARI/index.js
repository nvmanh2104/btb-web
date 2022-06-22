import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ARIMap from './map'
import ROUTER from '../../constants/router';
;


const ARI = () => (
	<Switch>
		<Route path={ROUTER.ARI.INDEX} component={ARIMap} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default ARI;
