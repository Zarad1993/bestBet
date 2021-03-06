import { Component } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map';

import userMoves from '../actions/action_userMoves';
import resetTraits from '../actions/action_resetTraits';
import updateUserZone from '../actions/action_updateZone';
import sendVote from '../actions/action_sendVote.js';
import logOut from '../actions/action_logout.js';

function mapStateToProps({ user, socket, allData }) {
  return { user, socket, allData };
}

export default connect(mapStateToProps, { userMoves, resetTraits, updateUserZone, sendVote, logOut })(Map);