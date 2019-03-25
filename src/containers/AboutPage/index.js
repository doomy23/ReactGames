import React from 'react';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FontAwesome from '../../components/FontAwesome';
import Logo from '../../components/Header/Logo';

class AboutPage extends React.Component {
  render() {
    const originalContributors = [
      {
        name: "Dominic Roberge",
        picture: "https://avatars2.githubusercontent.com/u/3316525",
        github: "https://github.com/doomy23",
        linkedin: "https://www.linkedin.com/in/dominic-roberge-55283b54"
      }
    ];

    const links = {
      github: "https://github.com/doomy23/ReactGames",
      license: "https://github.com/doomy23/ReactGames/blob/master/LICENSE",
      contributing: "https://github.com/doomy23/ReactGames/blob/master/CONTRIBUTING.md",
      issues: "https://github.com/doomy23/ReactGames/issues"
    };

    return (
      <Row>
        <Col>
          <ReactCSSTransitionGroup
          transitionName="content-transition"
          transitionAppear={true}
          transitionAppearTimeout={750}
          transitionEnter={false}
          transitionLeave={false}>
            <Logo/>
            <Row className="justify-content-md-center">
              <Col sm="12" md="8" lg="7">
                <p>
                  <span>This project is open-source and released under a : </span>
                  <a href={links.license} target="_blank">
                    <span>MIT license </span>
                    <FontAwesome name="gavel"/>
                  </a>
                </p>
                <p>
                  <span>Original GitHub repository :</span><br/>
                  <a href={links.github} target="_blank">
                    {links.github}
                  </a>
                </p>
                <p>
                  <span>Original contributors : </span>
                </p>
                <ul className="original-contributors">
                  {originalContributors.map((contributor, index) => (
                  <li key={index} className="clearfix">
                    <img src={contributor.picture}/>
                    <div>
                      <span className="name">{contributor.name}</span><br/>
                      {contributor.github ? (
                      <a href={contributor.github} target="_blank">
                        <FontAwesome brand name="github"/>
                      </a>
                      ) : null}
                      {contributor.linkedin ? (
                      <a href={contributor.linkedin} target="_blank">
                        <FontAwesome brand name="linkedin"/>
                      </a>
                      ) : null}
                    </div>
                  </li>
                  ))}
                </ul>
                <p>
                  <span>To contribute to the project please review </span>
                  <a href={links.contributing} target="_blank">
                    the CONTRIBUTING guide.
                  </a>
                </p>
                <p>
                  <span>You can submit any issues or bugs to :</span><br/>
                  <a href={links.issues} target="_blank">
                    {links.issues}
                  </a>
                </p>
                <p className="text-center">
                  <span>Don't forget to have some fun!</span><br/>
                  <FontAwesome className="big" name="smile-wink"/>
                </p>
              </Col>
            </Row>
          </ReactCSSTransitionGroup>
        </Col>
      </Row>
    );
  }
}

export default AboutPage;
