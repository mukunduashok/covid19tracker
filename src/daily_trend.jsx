import { Modal, Button } from 'react-bootstrap';
import { BasePlot, React } from './base_plot.jsx';
import { Bar } from 'react-chartjs-2';

class TrendBar extends BasePlot {
    constructor(props) {
        super(props)
        this.state = {
            show: props.show,
            stateName: null,
            apiData: {},
            confirmedData: {},
            recoveredData: {},
            deceasedData: {},
            testedData: {},
            confirmedOptions: {},
            recoveredOptions: {},
            deceasedOptions: {},
            testedOptions: {},
        }
        this.pullTimeSeriesData();
    }

    componentWillUnmount() {
        this.api.source.cancel("Operation cancelled by the user");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show != this.state.show) {
            const stateName = nextProps.stateName;
            this.getStateWiseTimeSeriesData(stateName);
            this.setState({ show: nextProps.show, stateName: stateName });
        }
    }

    async pullTimeSeriesData() {
        const data = await this.api.getData(this.constants.API_URLS.COVID_19_STATE_WISE_DAILY_CHANGES)
        this.setState({ apiData: data })
    }

    async getStateWiseTimeSeriesData(stateName) {
        const stateCode = this.constants.STATE_CODE_MAP[stateName].toUpperCase();
        const stateTrendData = this.state.apiData.data[stateCode]
        const x_date = [], y_confirmed = [], y_recovered = [], y_deceased = [], y_tested = [];
        Object.keys(stateTrendData).forEach((_date) => {
            x_date.push(_date);
            y_confirmed.push(stateTrendData[_date]['total']['confirmed']);
            y_recovered.push(stateTrendData[_date]['total']['recovered']);
            y_deceased.push(stateTrendData[_date]['total']['deceased']);
            y_tested.push(stateTrendData[_date]['total']['tested']);

        })
        this.setState({
            confirmedData: this.bar_data({ x_values: x_date, y_values: y_confirmed, bgColor: "rgb(245, 113, 64)" }),
            recoveredData: this.bar_data({ x_values: x_date, y_values: y_recovered, bgColor: "rgb(141, 231, 3)" }),
            deceasedData: this.bar_data({ x_values: x_date, y_values: y_deceased, bgColor: "rgb(218, 2, 2)" }),
            testedData: this.bar_data({ x_values: x_date, y_values: y_tested, bgColor: "rgb(160, 224, 220)" }),
            confirmedOptions: this.bar_options({ chart_title: "Daily Confirmed" }),
            recoveredOptions: this.bar_options({ chart_title: "Daily Recovered" }),
            deceasedOptions: this.bar_options({ chart_title: "Daily Deceased" }),
            testedOptions: this.bar_options({ chart_title: "Daily Tested" }),
        })
    }

    handleClose() { this.setState({ show: false }) }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)} dialogClassName="modal-90vw">
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.stateName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div id="trend_bar">
                        <Bar
                            data={this.state.confirmedData}
                            options={this.state.confirmedOptions}
                            width={70}
                            height={20}
                        />
                        <Bar
                            data={this.state.recoveredData}
                            options={this.state.recoveredOptions}
                            width={70}
                            height={20}
                        />
                        <Bar
                            data={this.state.deceasedData}
                            options={this.state.deceasedOptions}
                            width={70}
                            height={20}
                        />
                        <Bar
                            data={this.state.testedData}
                            options={this.state.testedOptions}
                            width={70}
                            height={20}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default TrendBar