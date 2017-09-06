import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import {Grid, Col,Row} from 'react-native-elements';
import * as types from '../constants/ActionTypes';

export default class ShowCompetencies extends React.Component {
  constructor (props) {
    super(props);
    this.competenciesRating = [];
    this.state = {
      starRate: []
    };
  }
  componentWillReceiveProps() {
    this.setState({
          starRate: []
        });
    this.competenciesRating = [];
  }
  onStarRatingPress(rating, index) {
    const rate = this.state.starRate.slice();
    rate[index] = rating;
    this.setState({
      starRate: rate
    });
    let competenciesRating = this.competenciesRating;
    competenciesRating[(this.props.userCompetencies[index].competencies)] = rate[index];
    var competenciesRatingArray = [];
    for (var key in competenciesRating){
        competenciesRatingArray.push({
            competancies: key,
            rating: competenciesRating[key],
            comment: ""
        })
    }
    const connection = {
      giverProfile: this.props.loggedInUserId,
      seekerProfile: this.props.selectedUserIdInGroup,
      seekerGroup: this.props.groupId,
      feedback: competenciesRatingArray
    };
    this.props.competenciesRatingDetails(connection);
  }

  render () {
    const createBusinessImpact = (impacts) => {
    return (impacts && impacts.map((BI, i) => {
      return (
        <ListItem key={i} hideChevron={true} subtitle={
            <Grid>
              <Col size={1}>
                <Text style={{color: 'black'}}>
                 {BI.competancies || BI.competencies}
                </Text>
              </Col>
              <Col size={1}>
                <View style={styles.stars}>
                  <StarRating
                  key={i}
                  disabled={false}
                  maxStars={5}
                  starSize={18}
                  rating={BI.rating || this.state.starRate[i]}
                  selectedStar={(rating) => this.onStarRatingPress(rating,i)}/>
              </View>
              </Col>
            </Grid>
         }>
        </ListItem>
      )
    }))
    };
    return (
      <Card containerStyle={styles.cardStyle}
        title={this.props.selectedUserInGroup}
        titleStyle={{fontWeight:'bold',alignSelf:'center'}}
        dividerStyle={{borderWidth:0.5}}>
          {createBusinessImpact(this.props.data)}
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle:{
    flex: 1,
    marginTop: 3,
    marginBottom: 8
  },
  stars: {
    marginLeft:30,
    flex:1,
    justifyContent: 'center'
  }
});
