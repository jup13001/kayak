import React from 'react';

import './airlines.css'
class Airlines extends React.Component {
    constructor(props) {
        super(props);

    }
    baseURL = "https://www.kayak.com";

    getHostname(url) {
        try {
          const { hostname } = new URL(url);
          return hostname.replace('www.', '');
        } catch (error) {
          return undefined;
        }
      }

    // Check and return the appropiate airline based on the alliance code
    getAlliance(alliance) {
        switch(alliance) {
            case 'ST': return 'Sky Team'
            case 'OW': return 'Oneworld'
            case 'SA': return 'Star Alliance'
            default: return '';
        }
    }
    render() {
        return (
            <div class="container">
                {this.props.airlines ? this.props.airlines.map(airline => ( 
                    <div class="airline-wrapper">
                       <div class="content">
                           <div class="image-wrapper">
                            <img src={`${this.baseURL}${airline.logoURL}`} width="32px" height="32px" />
                           </div>
                            <div class="airline-info"> <p class="airline-name">{airline.name} <span>({airline.code})</span></p>
                            <div class="additional-content">
                                {airline.alliance !== 'none' && <p>{this.getAlliance(airline.alliance)}</p>}
                                <p>{airline.phone}</p>
                                { airline.site && <p><a class="link" href={airline.site} target="__blank">{ this.getHostname(airline.site) }</a></p>}
                            </div>
                            </div>
                        </div>
                    </div>)) : 
                    [...Array(10)].map(() => (<div class="airline-wrapper shimmer">
                        <div class="content shimmer">
                            <div class="image shimmer"></div>
                            </div>
                    </div>))
                }
            </div>
        );
    }
}

export default Airlines;