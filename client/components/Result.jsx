import React from 'react';
import axios from 'axios';
import { Card, Popover } from 'antd';
import Spinner from './utility/Spinner';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            dates : [] //store all dates
        }

        this.ShowEachDate = this.ShowEachDate.bind(this);
        this.CardOnClick = this.CardOnClick.bind(this);
        this.PopOver = this.PopOver.bind(this);
        this.containFalse = this.containFalse.bind(this);
    }

    componentDidMount() {
        let self = this;

        axios.get('/getWorkout-date').then(function(response) {
            self.setState({dates : response.data})
        })
    }

    containFalse(mustlePart){
        for(var item in mustlePart){
            console.log(item)
            console.log(mustlePart[item])
            if(mustlePartp[item] === false){
                return true
            }
        }
        return false;
    }

    PopOver(date){

    }

    CardOnClick(date){
        axios.get('/getWorkout-detail', {
            params:{
                date : date 
              }
        }).then(function(response) {
            
            //create the global file for this
            const mp = ['chest', 'back', 'shoulder', 'biceps', 'triceps', 'legs']
            const len = 6

            var detailToShow = []
            for(var i = 0; i < len ; i++){
                if(response.data[0].muscleUsed[i] === "true"){
                    
                    const musclepart = mp[i]
                    const muscle = response.data[0].muscleGroup[0]
                    detailToShow.push(musclepart) //insert Muscle part like chest, back, shoulder...
                   
                    for(var j in muscle[musclepart][0]){
                        if(muscle[musclepart][0][j] === true){
                            detailToShow.push(j) //insert details mustle
                        }
                    }
                }
            }
            console.log(detailToShow)
        })
    }

    ShowEachDate(){
        if(this.state.dates === []){
            return <Spinner/>
        }else{
            var dateArr = this.state.dates.map( item => {
                //console.log(item)
                return(
                    <Card
                        onClick={() => this.CardOnClick(item.date)}
                        value = {item.date}
                        style={{ width: 150, height: 70 }}
                    >
                        {item.date}
                    </Card>
                )
            })
            return dateArr
        }
    }

    render() {
        console.log(this.state.dates)
        return (
            <div>
                <div>Result Page</div>
                <div>
                    {this.ShowEachDate()}
                </div>
            </div>
        )
    }
}