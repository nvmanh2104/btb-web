import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AWSMap from './map'
import ROUTER from '../../constants/router';
;


const AWS = () => (
	<Switch>
		<Route path={ROUTER.AWS.INDEX} component={AWSMap} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default AWS;
