import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ROUTER from '../../constants/router';
import StatisticPage from './list';


const Statistic = () => (
	<Switch>
		<Route path={ROUTER.THONGKE.INDEX} component={StatisticPage} exact />
		{/* <Route path={ROUTER.MODELTYPE.ADD} component={AddModelTypePage} exact />
		<Route path={ROUTER.MODELTYPE.EDIT} component={EditModelTypePage} /> */}
	</Switch>
);

export default Statistic;