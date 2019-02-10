import React, { Component } from 'react';
import UserInfo from './UserInfo/userInfo';
import axios from './../../axios';
import userInfo from './UserInfo/userInfo';

class Manage extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        axios.get("/user-data")
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
    }

    render() {

        return (
            <div>

                <UserInfo
                    password={this.state.data.password}
                    key={this.state.data.key}
                />

                {/* {this.state.data.map(data => (
                    <UserInfo

                    />
                ))} */}
            </div>
        )
    }
}

export default Manage;