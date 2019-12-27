import React, { useState, useEffect } from 'react';
import ListItem from './ListItem'
import '../List.css'

const List = ({ list, deleteItem }) => {
    const [date, setDate] = useState();
    const [daysTodos, setDaysTodos] = useState([]);
    const [organisedDateList, setOrganisedDateList] = useState({});
    // const [organisedDateList, setOrganisedDateList] = useState({})
    // const organisedDateList = {};
    // const getDates = (list) => {
    //     return list.forEach(item => {
    //         let parsedAndFormattedDate = new Date(JSON.parse(item.date)).toLocaleDateString();
    //         if (organisedDateList.hasOwnProperty(parsedAndFormattedDate)) {
    //             organisedDateList[parsedAndFormattedDate].push(item.content);
    //         } else {
    //             organisedDateList[parsedAndFormattedDate] = [];
    //             organisedDateList[parsedAndFormattedDate].push(item.content)
    //         }
    //     });
    // }

    useEffect(() => {
        let updatedObject = {}
        list.map(item => {
                let parsedAndFormattedDate = new Date(JSON.parse(item.date)).toLocaleDateString();
                console.log(item.content);
                if (updatedObject.hasOwnProperty(parsedAndFormattedDate)) {
                    updatedObject = {
                        ...updatedObject,
                        [parsedAndFormattedDate]: [...updatedObject[parsedAndFormattedDate], item.content]
                    }
                } else {
                   updatedObject = {
                        ...updatedObject,
                        [parsedAndFormattedDate]: [item.content],
                    }
                    
                }
            });
        
        setOrganisedDateList(updatedObject)
    }, [list])
    
    console.log(organisedDateList)

    return (
        <div>
            <label className="date-label" htmlFor="date">
                Date
                <select
                    id="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    onBlur={e => setDate(e.target.value)}
                >
                {Object.keys(organisedDateList).map(date => <option key={date} value={date}>{date}</option>)}
                </select>
            </label>
            
            <ul className="todo-list">
            {list.map((item) => (
                <ListItem key={item.id} todo={item} deleteItem={() => deleteItem(item.id)}/>
            ))}
            </ul>
        </div>
    )
}

export default List;