import React, { Component } from 'react';
import Api from './api-requests';
import ApiConstants from './constants.js';
import { Dropdown } from 'react-bootstrap';

class BasePlot extends Component {
    constructor(props) {
        super(props);
        this.api = new Api();
        this.constants = new ApiConstants();
        this.tempYear = "2020"; // Tech Debt: Year needs to be dynamic. Needs update 
        this.stateNames = this.stateList();
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

    stateList() {
        // State list dropdown HTML
        const stateNames = []
        for (const stateName in this.constants.STATE_CODE_MAP) {
            stateNames.push(<Dropdown.Item key={stateName} eventKey={stateName}>{stateName}</Dropdown.Item>)
        }
        return stateNames
    }

    bar_data(options) {
        /**
         * options: {
         *  x_values: [] // Required
         *  y_values: [] // Required
         *  bgColor: <rgb / rgba> // optional
         *  borderWidth: <number> // optional
         * }
         */
        const bgColor = options.bgColor == undefined ? "rgb(72, 79, 87)" : options.bgColor;
        const borderWidth = options.borderWidth == undefined ? 1 : options.borderWidth;
        return {
            labels: options.x_values,
            datasets: [
                {
                    backgroundColor: bgColor,
                    borderWidth: borderWidth,
                    hoverBorderColor: "rgb(136, 15, 225)",
                    data: options.y_values,
                }
            ]
        }
    }

    bar_options(options) {
        /**
         * options = {
         *  chart_title: <string> // Required
         *  title_font_size: <number> // optional
         *  showLegend: <true / false> // optional
         * }
         */
        const title_font_size = options.title_font_size == undefined ? 20 : options.title_font_size;
        const showLegend = options.showLegend == undefined ? false : showLegend;
        return {
            title: { display: true, text: options.chart_title, fontSize: title_font_size },
            legend: { display: showLegend },
            tooltips: {
                backgroundColor: "rgb(49, 106, 99)",
            }
        }
    }
}

export { BasePlot, React };