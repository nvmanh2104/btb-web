import React from 'react';
import { Route, Switch } from 'react-router-dom';
import WRSIMap from './map'
import ROUTER from '../../constants/router';
;


const WRSI = () => (
	<Switch>
		<Route path={ROUTER.WRSI.INDEX} component={WRSIMap} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default WRSI;
