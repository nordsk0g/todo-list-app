import React, { useState, useEffect } from 'react';
import ListItem from './ListItem'
import '../List.css'

const List = ({ list, deleteItem, organisedDateList, initialDate }) => {
    const [date, setDate] = useState();
    const [daysTodos, setDaysTodos] = useState(null);
    
    useEffect(() => {
        setDate(initialDate)
    }, [initialDate])

    useEffect(() => {
        setDaysTodos(organisedDateList[date]);
    }, [organisedDateList, date])
    
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
            {daysTodos
            ? daysTodos.map((item) => (
                <ListItem key={item.id} todo={item} deleteItem={() => deleteItem(item.id)}/>
            ))
            : ''
            }
            </ul>
        </div>
    )
}

export default List;