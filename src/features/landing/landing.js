import React from 'react';
import './landing.css'
import fetchJsonp from 'fetch-jsonp';
import Airlines from '../airlines/airlines';


class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            airlines: null,
            alliances: new Set(),
            filteredAirlines: null,
        }
        this.changeAlliance = this.changeAlliance.bind(this);
        this.setFilteredAirlines = this.setFilteredAirlines.bind(this);
    }


    async componentDidMount() {
        // Set the airlines state then pass it down to airlines component
        const url = "https://www.kayak.com/h/mobileapis/directory/airlines/homework";
        const response = await fetchJsonp(url, { jsonpCallback: 'jsonp' });
        const data = await response.json();
        this.setState({ airlines: data, filteredAirlines: data });

    }

    // Set the alliance value 
    // Filter the list of airlines that match the set the alliance
    changeAlliance(event) {
        const alliance = event.target.value;
        // if the alliance is unchecked
        // remove it from the list of alliances 
        let alliances = this.state.alliances;
        alliances.add(alliance)
        if (!event.target.checked) {
            alliances.delete(alliance);
        }
        this.setState({ alliances: alliances });
        // If there's no filter applied, show all airlines
        if (alliances.size == 0) {
            const airlines = this.state.airlines;
            this.setState({ filteredAirlines: airlines });
            return;
        }
        this.setFilteredAirlines();
    }

    /**
     * Filter through the airlines with the alliances selected
     */
    setFilteredAirlines() {
        let alliances = this.state.alliances;
        const airlines = this.state.airlines;
        this.setState({
            filteredAirlines: airlines.filter(airline =>
                alliances.has(airline.alliance)
            )
        });
    }



    render() {
        return (
            <div class="landing">
                <div class="heading">
                    <p>Airlines</p>
                </div>
                <div class="alliances">
                    <p>Filter by Alliances</p>
                    <div class="alliance-container">
                        {[{ name: "Sky Team", value: "ST" }, { name: "Oneworld", value: "OW" }, { name: "Star Alliance", value: "SA" }].map(alliance => (
                            <div class="alliance-list">
                                <input type="checkbox" id={alliance.name} name={alliance.name} 
                                value={alliance.value} onChange={this.changeAlliance} />
                                <label for="scales">{alliance.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="airlines">
                    <Airlines airlines={this.state.filteredAirlines} />
                </div>
            </div>
        );
    }
}

export default Landing;