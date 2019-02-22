import React, { Component } from 'react';
import UserInfo from './UserInfo/userInfo';
import axios from './../../axios';
import RandomPass from './RandomPassword/RandomPassword';
import firebase from 'firebase';

class Manage extends Component {

    state = {
        data: [],
        randomData: []
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = firebase.auth().currentUser.uid;
                console.log("uid: " + uid);
                axios.get("/" + uid + "/user-data.json")
                    .then(response => {
                        const fetchData = [];

                        for (let key in response.data) {
                            fetchData.push({
                                ...response.data[key],
                                id: key
                            })
                        }
                        this.setState({ data: fetchData })
                    })

                axios.get("/" + uid + "/random-password.json")
                    .then(response => {
                        const fetchPass = [];
                        for (let key in response.data) {
                            fetchPass.push({
                                ...response.data[key],
                                id: key
                            })
                        }
                        console.log(fetchPass.randomData)
                        this.setState({ randomData: fetchPass });
                    })

            } else {
                console.log("User isn't login");
            }
        })
    }

    deleted = (id) => {
        console.log("delete entry");
        let uid = firebase.auth().currentUser.uid;
        axios.delete("/" + uid + "/user-data/" + id + ".json")
            .then()
            .catch(response => {
                console.log(response);
            })
    }

    render() {

        // will map throug data state and print everything inside
        // this.state.data.map((u) => (
        //     console.log(u.password + " : " + u.key)
        // ))

        return (
            <div>
                <h2>Stored information</h2>
                {this.state.data.map((u) => (
                    <div>
                        {/* <p>password : {u.password}</p>
                            <p>key : {u.key}</p> */}

                        <UserInfo
                            encryption={u.encryption}
                            password={u.password}
                            keys={u.key}
                            delete={() => this.deleted(u.id)}
                        />
                    </div>
                ))
                }
                {/* {this.state.data.map((u) => (
                    <div>
                        <RandomPass
                            randomPassword={u.password}
                        />
                    </div>
                ))} */}

            </div>
        )
    }
}

export default Manage;