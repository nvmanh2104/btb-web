import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AWSMap from './map'
import ROUTER from '../../constants/router';
;


const SPI = () => (
	<Switch>
		<Route path={ROUTER.SPI.INDEX} component={AWSMap} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default SPI;
