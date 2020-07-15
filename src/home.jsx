import React, { useState } from 'react';
import DistrictWiseStats from "./state_level.jsx";
import TrendBar from "./daily_trend.jsx";
import { DailyCases, StateWiseCases } from "./nation_level.jsx";
import { Tabs, Tab } from 'react-bootstrap';

function HomePage(props) {
    const [visual, setVisual] = useState("state_wise");
    const [displayStateTable, setDisplayStateTable] = useState(true);
    const [displayDistrictTable, setDisplayDistrictTable] = useState(false);
    const [displayGraphs, setDisplayGraphs] = useState(false);

    return (
        <div id='home_page'>
            <Tabs
                className="nav-justified"
                defaultActiveKey="profile"
                id="visual_type"
                activeKey={visual}
                onSelect={(e) => {
                    setVisual(e);
                    setDisplayStateTable(e === 'state_wise');
                    setDisplayDistrictTable(e === 'district_wise');
                    setDisplayGraphs(e === 'graphs');
                }}>
                <Tab eventKey="state_wise" title="STATE LEVEL STATS"></Tab>
                <Tab eventKey="district_wise" title="DISTRICT LEVEL STATS"></Tab>
                <Tab eventKey="graphs" title="DAILY TRENDS"></Tab>
            </Tabs>
            <StateWiseCases
                showStats={displayStateTable}
            />
            <DistrictWiseStats
                showStats={displayDistrictTable}
                stateName="Maharashtra"
            />
            <TrendBar
                showStats={displayGraphs}
                stateName="Maharashtra"
            />
        </div>
    )
}

export default HomePage;