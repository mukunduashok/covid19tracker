import { React } from './base_plot.jsx';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
                <Navbar.Brand>COVID-19 INDIA</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#daily_cases">Nation Wide Daily Count</Nav.Link>
                        <Nav.Link href="#state_wise_cases">State Wise Counts</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default MenuBar;