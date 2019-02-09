import React, { Component } from 'react';
import UserInfo from './UserInfo/userInfo';
import axios from './../../axios';

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
                <h2>test</h2>
                {this.state.data.map(data => (
                    <UserInfo
                        password={data.password}
                        key={data.key}
                    />
                ))}
            </div>
        )
    }
}

export default Manage;