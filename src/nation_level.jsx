import moment from 'moment';
import { BasePlot, React, Plot } from './base_plot.jsx';
import DistrictWiseStats from "./state_level.jsx";


class DailyCases extends BasePlot {
  constructor(props) {
    super(props);
    this.state = { data: [], layout: {}, frames: [], config: {} }
  }

  componentDidMount() {
    this.plotDailyCasesTrend()
  }

  componentWillUnmount() {
    this.api.source.cancel("Operation cancelled by the user");
  }

  async plotDailyCasesTrend() {
    const data = await this.api.getData(this.constants.API_URLS.COVID_19_STATE_WISE_DATA);
    const plotData = await data.data.cases_time_series
    const x_values = [];
    const y_values = [];
    plotData.forEach((item, index) => {
      x_values.push(moment(item.date + this.tempYear + " 00:00:00 Z").utc().format("YYYY-MM-DD"));
      y_values.push(item.totalconfirmed);
    });
    this.setState(
      {
        data: [{ x: x_values, y: y_values, type: "bar" }],
        layout: {
          title: "Daily Trend - India",
          paper_bgcolor: "rgb(52, 58, 64)",
          plot_bgcolor: "rgb(72, 79, 87)",
          font: {
            color: "rgb(255, 255, 255)"
          }
        }
      });
  }

  render() {
    return (
      <div id="daily_cases">
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          style={{ width: "100%" }}
        />
      </div>
    );
  }
}

class StateWiseCases extends BasePlot {
  constructor(props) {
    super(props);
    this.state = { headers: [], plotData: [], showModal: false, stateName: null }
  }

  componentDidMount() {
    this.plotStateWiseTable();
  }

  componentWillUnmount() {
    this.api.source.cancel("Operation cancelled by the user");
  }

  openDistrictTable(element) {
    this.setState({ showModal: true, stateName: element.target.text })
  }

  async plotStateWiseTable() {
    const data = await this.api.getData(this.constants.API_URLS.COVID_19_STATE_WISE_DATA);
    const plotData = data.data.statewise;
    const headers = ["State", "Confirmed", "Active", "Recovered", "Deceased"];
    this.setState({
      headers: headers,
      plotData: plotData
    })
  }

  render() {
    const headerValues = [];
    const plotData = [];
    this.state.headers.forEach((item, index) => {
      headerValues.push(<th key={index} className="tableHeaderStyle">{item}</th>)
    });
    this.state.plotData.forEach((item, index) => {
      const newConfirmed = item.deltaconfirmed;
      const newRecovered = item.deltarecovered;
      const newDeaths = item.deltadeaths;
      const newConfirmedHtml = newConfirmed != 0 ? <span>&nbsp;&nbsp;<span className="confirmedArrowUpStyle"></span>&nbsp;{newConfirmed}</span> : null;
      const newRecoveredHtml = newRecovered != 0 ? <span>&nbsp;&nbsp;<span className="receoveredArrowUpStyle"></span>&nbsp;{newRecovered}</span> : null;
      const newDeathsHtml = newDeaths != 0 ? <span>&nbsp;&nbsp;<span className="confirmedArrowUpStyle"></span>&nbsp;{newDeaths}</span> : null;
      plotData.push(
        <tr key={index}>
          <td scope="row"><a href="#" onClick={this.openDistrictTable.bind(this)}>{item.state}</a></td>
          <td>{item.confirmed} {newConfirmedHtml}</td>
          <td>{item.active}</td>
          <td>{item.recovered} {newRecoveredHtml}</td>
          <td>{item.deaths} {newDeathsHtml}</td>
        </tr>
      )
    })

    return (
      <div id="state_wise_cases">
        <br></br>
        <DistrictWiseStats
          show={this.state.showModal}
          stateName={this.state.stateName}
        />
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
    )
  }
}


export { DailyCases, StateWiseCases };