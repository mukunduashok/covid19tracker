import { BasePlot, React } from './base_plot.jsx';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class DistrictWiseStats extends BasePlot {
    constructor(props) {
        super(props);
        this.state = { stateName: "Maharashtra", headers: [], plotData: [], data: null, showStats: props.showStats, stateSelect: "Maharashtra" }
        this.getDistrictWiseData();
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillUnmount() {
        this.api.source.cancel("Operation cancelled by the user");
    }

    static getDerivedStateFromProps(props, currentState) {
        if (currentState.showStats != props.showStats) {
            return {
                showStats: props.showStats
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateName !== this.props.stateName) {
            this.districtWiseData(this.props.stateName);
        }
    }

    async getDistrictWiseData() {
        const data = await this.api.getData(this.constants.API_URLS.COVID_19_DISTRICT_WISE_DATA);
        this.setState({ data: data });
        this.districtWiseData(this.state.stateName);
    }

    districtWiseData(stateName) {
        if (stateName != null) {
            let plotData = [];
            const _plotData = this.state.data.data;
            if (stateName == "Total") {
                Object.entries(_plotData).forEach(([key, value]) => {
                    Object.entries(value.districtData).forEach(([key, value]) => {
                        plotData[key] = value
                    })
                })
            } else {
                plotData = _plotData[stateName]["districtData"]
            }
            const headers = ["District", "Confirmed", "Active", "Recovered", "Deceased"];
            this.setState({
                headers: headers,
                plotData: plotData,
            });
        }
    }

    handleSelect(e) {
        this.districtWiseData(e);
        this.setState({ stateSelect: e });
    }

    render() {
        const headerValues = [];
        const plotData = [];
        this.state.headers.forEach((item, index) => {
            headerValues.push(<th className="tableHeaderStyle" key={index}>{item}</th>)
        });
        const stateData = this.state.plotData;
        // Cumulative daily values
        for (const item in stateData) {
            const newConfirmed = stateData[item].delta.confirmed;
            const newRecovered = stateData[item].delta.recovered;
            const newDeaths = stateData[item].delta.deceased;
            const newConfirmedHtml = newConfirmed != 0 ? <span>&nbsp;&nbsp;<span className="confirmedArrowUpStyle"></span>&nbsp;{newConfirmed}</span> : null;
            const newRecoveredHtml = newRecovered != 0 ? <span>&nbsp;&nbsp;<span className="receoveredArrowUpStyle"></span>&nbsp;{newRecovered}</span> : null;
            const newDeathsHtml = newDeaths != 0 ? <span>&nbsp;&nbsp;<span className="confirmedArrowUpStyle"></span>&nbsp;{newDeaths}</span> : null;
            plotData.push(
                <tr key={item}>
                    <td scope="row">{item}</td>
                    <td>{stateData[item].confirmed} {newConfirmedHtml}</td>
                    <td>{stateData[item].active}</td>
                    <td>{stateData[item].recovered} {newRecoveredHtml}</td>
                    <td>{stateData[item].deceased} {newDeathsHtml}</td>
                </tr>
            )
        }

        if (this.state.showStats) {
            return (
                <div id="district_wise_cases" className="content-padding">
                    <DropdownButton alignRight id="state_select_district_data" title={this.state.stateSelect} onSelect={this.handleSelect}>
                        {this.stateNames}
                    </DropdownButton>
                    <br></br>
                    <table className="table table-dark table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                {headerValues}
                            </tr>
                        </thead>
                        <tbody>
                            {plotData}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return ("");
        }
    }
}

export default DistrictWiseStats;