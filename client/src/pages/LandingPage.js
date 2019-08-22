import React, { Component } from 'react';
import DummyImage from '../images/ai.svg';
import SocialIcon from '../images/social-icon.png';

class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="header-section" />
        <div className="row">
          <div className="col-lg-6">
            <h1 className="header-text">
            What does&nbsp;
              <span className="gold-text">
              100% optimization
              </span>
                &nbsp;look like for you?
            </h1>
          </div>
          <div className="col-lg-6">
            <img className="header-image" src={DummyImage} alt="dummy" />
          </div>
        </div>
        <div className="row about-block">
          <div className="col-lg-8">
            <p className="about-paragraph">
            In an increasingly digital age, we seem to have a place online for
            everything. We have social networks specific for our friends, our careers,
            our dating lives, and our hobbies. Yet, at the same time, we don’t have a
            social network targeted toward being our
              <span className="gold-text">
              &nbsp;best, most productive selves.&nbsp;
              </span>
            </p>
            <p className="about-paragraph">
            That’s where Dayli comes in. What would your life look like if, according
            to your own terms, you were 100% optimized? Dayli aims to bridge
              <span className="gold-text">
              &nbsp;self-discipline and social accountability&nbsp;
              </span>
            in a platform where you can use the power of a tight-knit
            community to stay on top of your daily goals and habits.
            </p>
          </div>
          <div className="col-lg-4">
            <img className="header-image" src={DummyImage} alt="dummy" />
          </div>
        </div>
        <div className="about">
          <div className="row">
            <div className="col-lg-4">
              <div className="about-item">
                <img className="about-image" src={DummyImage} alt="dummy" />
                <h1>Habit tracking</h1>
                <p>Keep track of your daily habits, goals, sleep schedule, and mood over time.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-item">
                <img className="about-image" src={SocialIcon} alt="dummy" />
                <h1>Accountability</h1>
                <p>Set up a support network and hold each other accountable.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-item">
                <img className="about-image" src={DummyImage} alt="dummy" />
                <h1>Dummy title</h1>
                <p>This is dummy description item within a dummy page on a dumb site.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
