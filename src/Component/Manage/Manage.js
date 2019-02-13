import React, { Component } from 'react';
import UserInfo from './UserInfo/userInfo';
import axios from './../../axios';
import userInfo from './UserInfo/userInfo';

class Manage extends Component {

    state = {
        data: []
    }

    componentDidMount() {


        axios.get("/user-data.json")
            .then(response => {
                const fetchData = [];

                for (let key in response.data) {
                    fetchData.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({ data: fetchData })

                // console.log("data:" + this.state.data);
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
                            password={u.password}
                            keys={u.key}
                        />
                    </div>
                ))
                }

                {/* {this.state.data.map(u => (
                    <UserInfo
                        password={this.state.data.password}
                        keys={this.state.data.key}
                    />
                ))} */}


                {/* {this.state.data.map(data => (
                    <UserInfo

                    />
                ))} */}
            </div>
        )
    }
}

export default Manage;