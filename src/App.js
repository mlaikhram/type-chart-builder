import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import './App.css';
import TypeChart from './components/TypeChart';


function App() {
    return (
        <div className="App">
            <Navbar color="dark" dark expand="md">
                <NavbarBrand>TypeCharts</NavbarBrand>
                <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar>
            <TypeChart />
        </div>
    );
}

export default App;
