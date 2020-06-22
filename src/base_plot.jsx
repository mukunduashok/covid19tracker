import React from 'react';
import Api from './api-requests';
import ApiConstants from './constants.js';

class BasePlot extends React.Component {
    constructor(props) {
        super(props);
        this.api = new Api();
        this.constants = new ApiConstants();
        this.tempYear = "2020" // Tech Debt: Year needs to be dynamic. Needs update
    }
    // Find a right place to call below pull data methods

    async pullStateWiseData() {
        const data = await this.api.getData(this.constants.API_URLS.COVID_19_STATE_WISE_DATA);
        return data;
    }

    async pullDistrictWiseData() {
        const data = await this.api.getData(this.constants.API_URLS.COVID_19_DISTRICT_WISE_DATA);
        return data;
    }
}

export { BasePlot, React };