import { BasePlot, React, Plot } from './base_plot.jsx';
import { Modal, Button } from 'react-bootstrap';

class DistrictWiseStats extends BasePlot {
    constructor(props) {
        super(props);
        this.state = { show: props.show, stateName: null, headers: [], plotData: [], data: null }
        this.getDistrictWiseData();
    }

    componentWillUnmount() {
        this.api.source.cancel("Operation cancelled by the user");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show != this.state.show) {
            this.districtWiseData(nextProps.stateName);
            this.setState({ show: nextProps.show, stateName: nextProps.stateName });
        }
    }

    async getDistrictWiseData() {
        const data = await this.api.getData(this.constants.API_URLS.COVID_19_DISTRICT_WISE_DATA);
        this.setState({ data: data });
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

    handleClose() { this.setState({ show: false }) }

    render() {
        const headerValues = [];
        const plotData = [];
        this.state.headers.forEach((item, index) => {
            headerValues.push(<th className="tableHeaderStyle" key={index}>{item}</th>)
        });
        const stateData = this.state.plotData;
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
        return (
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.stateName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DistrictWiseStats;