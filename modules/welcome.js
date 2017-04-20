var React = require('react');
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Home from './home.js';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    if (this.props.data.loading) {
      // loading
      return (<div></div>)
    }

    if (this.props.data.error) {
      // error
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
    console.log(this.props.data);

    if (this.props.data.logged_in) {
      return(
        <Home
          fullName={this.props.data.current_user.fullName}
          userPicture={this.props.data.current_user.smallPhoto}
          groupMembers={this.props.data.current_user.groupMembers}/>
      );
    }
    return(
      <div>
        <a href="http://reeltalk.student.cwru.edu:3000/auth/facebook">Login</a>
      </div>
    );
  }
}

Welcome.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    logged_in: React.PropTypes.bool,
  }).isRequired,
};

const CurrentUserQuery = gql`
  query CurrentUserQuery {
    logged_in,
    current_user {
      fullName,
      smallPhoto,
      groupMembers {
        id,
        smallPhoto
      }
    }
  }
`

const WelcomeWithData = graphql(CurrentUserQuery)(Welcome)

export default WelcomeWithData;
