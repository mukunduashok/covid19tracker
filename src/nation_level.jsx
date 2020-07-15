import { Tabs, Tab } from 'react-bootstrap';
import { BasePlot, React } from './base_plot.jsx';
import { Bar } from 'react-chartjs-2';


class DailyCases extends BasePlot {
  constructor(props) {
    super(props);
    this.state = { data: {}, options: {}, key: "30", displayType: "daily" };
    this.x_values = [];
    this.y_values = [];
    this.y_daily = [];
  }

  componentDidMount() {
    this.plotDailyCasesTrend();
  }

  componentWillUnmount() {
    this.api.source.cancel("Operation cancelled by the user");
  }

  async plotDailyCasesTrend() {
    const data = await this.api.getData(this.constants.API_URLS.COVID_19_STATE_WISE_DATA);
    const plotData = await data.data.cases_time_series;
    plotData.forEach((item, index) => {
      this.x_values.push(new Date(item.date + this.tempYear).toLocaleDateString())
      this.y_values.push(item.totalconfirmed);
      this.y_daily.push(item.dailyconfirmed)
    });
    this.updatePlotData(30, { cumulative: false });
  }

  updatePlotData(days, opts) {
    /**
     * days: number of days to display (string or number)
     * opts.cumulative: <true / false>  // required
     */
    const y_values = opts.cumulative === true ? this.y_values : this.y_daily;
    const data = this.bar_data({ x_values: this.x_values.slice(-days), y_values: y_values.slice(-days), bgColor: "rgb(72, 79, 87)" });
    const options = this.bar_options({ chart_title: "DAILY CASES - INDIA", title_font_size: 20 });
    this.setState({ data: data, options: options });
    this.y_values = Object.assign([], this.y_values);  // Debt: Need to check why this.y_values gets sliced
    this.y_daily = Object.assign([], this.y_daily);  // Debt: Need to check why this.y_daily gets sliced
  }

  render() {
    return (
      <div id="daily_cases" className="content-padding">
        <Tabs className="nav-justified" defaultActiveKey="profile" id="select_display" activeKey={this.state.displayType}
          onSelect={(e) => {
            this.updatePlotData(this.state.key, { cumulative: e === "cumulative" });
            this.setState({ displayType: e, key: this.state.key });
          }}>
          <Tab eventKey="daily" title="DAILY"></Tab>
          <Tab eventKey="cumulative" title="CUMULATIVE"></Tab>
        </Tabs>
        <Tabs className="nav-justified" defaultActiveKey="profile" id="select_days" activeKey={this.state.key}
          onSelect={(k) => {
            this.updatePlotData(Number(k), { cumulative: this.state.displayType === "cumulative" });
            this.setState({ key: k, displayType: this.state.displayType });
          }}>
          <Tab eventKey="30" title="30 DAYS"></Tab>
          <Tab eventKey="45" title="45 DAYS"></Tab>
          <Tab eventKey="60" title="60 DAYS"></Tab>
          <Tab eventKey="75" title="75 DAYS"></Tab>
          <Tab eventKey="90" title="90 DAYS"></Tab>
          <Tab eventKey="0" title="ALL DAYS"></Tab>
        </Tabs>
        <Bar
          data={this.state.data}
          options={this.state.options}
          height={100}
        />
      </div>
    );
  }
}

class StateWiseCases extends BasePlot {
  constructor(props) {
    super(props);
    this.state = { headers: [], plotData: [], showStats: props.showStats }
  }

  componentDidMount() {
    this.plotStateWiseTable();
  }

  componentWillUnmount() {
    this.api.source.cancel("Operation cancelled by the user");
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

  static getDerivedStateFromProps(props, currentState) {
    if (currentState.showStats != props.showStats) {
      return {
        showStats: props.showStats
      }
    } else {
      return null;
    }
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
          <td scope="row">{item.state}</td>
          <td>{item.confirmed} {newConfirmedHtml}</td>
          <td>{item.active}</td>
          <td>{item.recovered} {newRecoveredHtml}</td>
          <td>{item.deaths} {newDeathsHtml}</td>
        </tr>
      )
    })
    if (this.state.showStats) {
      return (
        <div id="state_wise_cases" className="content-padding">
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
      )
    } else {
      return ("")
    }
  }
}

export { DailyCases, StateWiseCases };