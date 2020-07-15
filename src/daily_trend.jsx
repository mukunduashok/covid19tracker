import { Modal, Button } from 'react-bootstrap';
import { BasePlot, React } from './base_plot.jsx';
import { Bar } from 'react-chartjs-2';
import { DropdownButton, Tabs, Tab } from 'react-bootstrap';

class TrendBar extends BasePlot {
    constructor(props) {
        super(props)
        this.state = {
            showStats: props.showStats,
            stateName: "Maharashtra",
            apiData: {},
            confirmedData: {},
            recoveredData: {},
            deceasedData: {},
            testedData: {},
            confirmedOptions: {},
            recoveredOptions: {},
            deceasedOptions: {},
            testedOptions: {},
            stateSelect: "Maharashtra",
            days: "30",
        }
        this.pullTimeSeriesData();
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillUnmount() {
        this.api.source.cancel("Operation cancelled by the user");
    }

    static getDerivedStateFromProps(props, currentState) {
        if (currentState.showStats != props.showStats) {
            return {
                showStats: props.showStats,
                stateName: props.stateName
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateName !== this.props.stateName) {
            this.getStateWiseTimeSeriesData(this.state.stateName);
        }
    }

    async pullTimeSeriesData() {
        const data = await this.api.getData(this.constants.API_URLS.COVID_19_STATE_WISE_DAILY_CHANGES)
        this.setState({ apiData: data })
        this.getStateWiseTimeSeriesData(this.state.stateName, 30);
    }

    async getStateWiseTimeSeriesData(stateName, days) {
        /**
         * days: number of days to display (string or number)
         * opts.cumulative: <true / false>  // required
         */
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
            confirmedData: this.bar_data({ x_values: x_date.slice(-days), y_values: y_confirmed.slice(-days), bgColor: "rgb(245, 113, 64)" }),
            recoveredData: this.bar_data({ x_values: x_date.slice(-days), y_values: y_recovered.slice(-days), bgColor: "rgb(141, 231, 3)" }),
            deceasedData: this.bar_data({ x_values: x_date.slice(-days), y_values: y_deceased.slice(-days), bgColor: "rgb(218, 2, 2)" }),
            testedData: this.bar_data({ x_values: x_date.slice(-days), y_values: y_tested.slice(-days), bgColor: "rgb(160, 224, 220)" }),
            confirmedOptions: this.bar_options({ chart_title: "Daily Confirmed" }),
            recoveredOptions: this.bar_options({ chart_title: "Daily Recovered" }),
            deceasedOptions: this.bar_options({ chart_title: "Daily Deceased" }),
            testedOptions: this.bar_options({ chart_title: "Daily Tested" }),
        })
    }

    handleSelect(e) {
        this.getStateWiseTimeSeriesData(e, this.state.days);
        this.setState({ stateSelect: e, stateName: e });
    }

    render() {
        if (this.state.showStats) {
            return (
                <div id="trend_bar">
                    <Tabs className="nav-justified" defaultActiveKey="profile" id="select_days" activeKey={this.state.days}
                        onSelect={(k) => {
                            this.getStateWiseTimeSeriesData(this.state.stateName, Number(k));
                            this.setState({ days: k });
                        }}>
                        <Tab eventKey="30" title="30 DAYS"></Tab>
                        <Tab eventKey="45" title="45 DAYS"></Tab>
                        <Tab eventKey="60" title="60 DAYS"></Tab>
                        <Tab eventKey="0" title="ALL DAYS"></Tab>
                    </Tabs>
                    <br></br>
                    <DropdownButton alignRight id="state_select_trend_graphs" title={this.state.stateSelect} onSelect={this.handleSelect}>
                        {this.stateNames}
                    </DropdownButton>
                    <div>
                        <Bar
                            data={this.state.confirmedData}
                            options={this.state.confirmedOptions}
                            height={90}
                        />
                        <Bar
                            data={this.state.recoveredData}
                            options={this.state.recoveredOptions}
                            height={90}
                        />
                        <Bar
                            data={this.state.deceasedData}
                            options={this.state.deceasedOptions}
                            height={90}
                        />
                        <Bar
                            data={this.state.testedData}
                            options={this.state.testedOptions}
                            height={90}
                        />
                    </div>
                </div>
            );
        } else {
            return ("");
        }

    }
}

export default TrendBar