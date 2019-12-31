import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import SideNav from '../../components/SideNav';
import Loading from '../../components/shared/Loading';
import ErrorMessage from '../../components/shared/ErrorMessage';

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Strikethrough', style: 'STRIKETHROUGH' },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Blockquote', style: 'blockquote' },
  ],
};

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createEmptyValue(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  showCreateNew() {
    return (
      <div className="category-card">
        <div className="category-card-header">
          <h3 className="card-title">Create New Entry</h3>
        </div>
        <div className="category-card-body">
          <RichTextEditor
            value={this.state.value}
            onChange={this.handleChange}
            toolbarConfig={toolbarConfig}
            placeholder="What's on your mind?"
            autoFocus
          />
          <div className="d-flex justify-content-end">
            <button type="button" className="btn-primary mr-4">Post</button>
          </div>
        </div>
      </div>
    );
  }

  showPastEntries() {
    return (
      <div className="category-card past-entries">
        <div className="category-card-header">
          <h3 className="card-title">Past Entries</h3>
        </div>
        <div className="category-card-body scroll">
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
          <div className="line" />
          <div className="journal-entry-section">
            <a href="" className="navy-link">
              This is a test entry.
            </a>
            <p>1/5/20</p>
            <p>Public</p>
          </div>
        </div>
      </div>
    );
  }

  showContent() {
    return (
      <div>
        <ErrorMessage error={this.props.error} />
        { this.showCreateNew()}
        { this.showPastEntries() }
      </div>
    );
  }

  displayComponent() {
    return (
      <div className="container mt-6">
        <div className="header-container mb-3">
          <h1 className="header-title">Journal</h1>
        </div>
        {this.props.pending ? (
          <div className="d-flex justify-content-center">
            <Loading />
          </div>
        ) : this.showContent()}
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <SideNav component={this.displayComponent()} />
      </div>
    );
  }
}

Journal.propTypes = {
  error: PropTypes.string,
  pending: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    error: state.friendState.error, // TODO not friendState
    pending: state.friendState.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

Journal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Journal);

export default Journal;
