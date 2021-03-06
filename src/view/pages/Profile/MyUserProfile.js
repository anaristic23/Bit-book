import React, { Component } from 'react';
import * as userService from "../../../services/userService"
import "./MyUserProfile.css"
import { UserProfile } from './UserProfile'
// import { ModalPostVideo } from '../NewPosts/ModalPostVideo';

class MyUserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            profile: {},
            userId: null
        }
    }

   
    componentDidMount() {
        const userId = this.props.match.params.id;

        if (userId) {
            this.loadSingleUserProfile(userId);
        } else {
            this.loadProfileData();
        }
    }

    loadProfileData = () => {
        userService.fetchMyProfile()
            .then(myProfile => {
                this.setState({
                    profile: myProfile,
                    userId: myProfile.userId
                })
            })
            
    }
    componentDidUpdate() {
        this.localStorage()
    }


    localStorage = ()=>{
        localStorage.setItem('userId', this.state.userId)
   }
    

    loadSingleUserProfile(userId) {
        userService.fetchSingleUser(userId)
            .then(myUser => {
                this.setState({ profile: myUser })
            })
    }

    render() {

        if (!this.state.profile) {
            return <h1>Loading...</h1>
        }

        const {userId, name, aboutShort, avatarUrl, postsCount, commentsCount } = this.state.profile;
        const urlImg = "https://via.placeholder.com/150"
        return (

            <UserProfile userId={this.state.profile.userId}
                name={this.state.profile.name}
                aboutShort={this.state.profile.aboutShort}
                avatarUrl={this.state.profile.avatarUrl}
                postsCount={this.state.profile.postsCount}
                commentsCount={this.state.profile.commentsCount} />


        )
    }
}

export { MyUserProfile }
