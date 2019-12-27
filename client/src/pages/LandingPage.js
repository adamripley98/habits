import React, { Component } from 'react';
import DummyImage from '../images/ai.svg';
import CheckIcon from '../images/icons/check.png';
import ComputerIcon from '../images/computer-background.png';
import LaptopIcon from '../images/laptop-background.png';

class LandingPage extends Component {
  render() {
    return (
      <div>

        <div className="header-section">
          <div className="container pt-8">
            <div className="row">
              <div className="col-lg-6">
                <h1 className="header-text">
                What does&nbsp;
                  <span className="gold-text">
                  100% optimization
                  </span>
                    &nbsp;look like for you?
                </h1>
                <button type="button" className="btn-nav">FIND OUT NOW →</button>
              </div>
              <div className="col-lg-6">
                <img className="header-image" src={DummyImage} alt="dummy" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-tb-7 yellow-section">
          <div className="container">
            <div className="row about-block">
              <div className="col-lg-5">
                <img className="header-image" src={DummyImage} alt="dummy" />
              </div>
              <div className="col-lg-7">
                <div>
                  <h1 className="navy-text bold">Bring it to life with Dayli.</h1>
                  <br />
                  <p className="about-paragraph">
                  In an increasingly digital age, we have social networks specific for our friends, our careers,
                  our dating lives, and our hobbies. Yet, at the same time, we don’t have an
                  online community targeted toward being our
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
                  <a href="/TODO" className="gold-link">JOIN WAITLIST →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section navy-text">
          <div className="container mt-5">
            <div className="row mb-10 d-flex align-items-center">
              <div className="col-lg-5">
                <div>
                  <div>
                    <img className="icon-pic m-2" src={CheckIcon} alt="icon" />
                    <div>
                      <h1 className="bold m-2 mr-4">Habit tracking</h1>
                    </div>
                    <p className="p-big p-2 mr-4">
                      Turn your vague daily routine into concrete, quantifiable personal metrics. Record your habits daily, analyze progress over time, and start functioning at 100%.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <img className="computer-image" src={ComputerIcon} alt="dummy" />
              </div>
            </div>
          </div>
          <div className="yellow-section p-tb-7">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-lg-7">
                  <img className="computer-image" src={LaptopIcon} alt="dummy" />
                </div>
                <div className="col-lg-5">
                  <img className="icon-pic m-2 ml-4" src={CheckIcon} alt="icon" />
                  <h1 className="bold m-2 ml-4">Social Accountability</h1>
                  <p className="p-big p-2 ml-4">
                    Set up a support network and hold each other accountable. Share thoughts, view habit progress, and make sure the people you care about most are taking care of themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container p-tb-7">
            <div className="row mt-5">
              <div className="col-lg-6">
                <img className="icon-pic m-2" src={CheckIcon} alt="icon" />
                <h1 className="bold m-2">Journaling</h1>
                <p className="p-big p-2">
                  Reflect and put your thoughts down on paper. Write what’s on your mind or select an existing prompt; share entries with your network or keep them for yourself.
                </p>
              </div>
              <div className="col-lg-6">
                <img className="icon-pic m-2" src={CheckIcon} alt="icon" />
                <h1 className="bold m-2">Mood tracking</h1>
                <p className="p-big p-2">
                  Record and analyze changes in your mood over time, answer customizable questions about your mental health, and keep track of your medications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
