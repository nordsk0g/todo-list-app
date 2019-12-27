import React, { useState, useEffect } from 'react';
import ListItem from './ListItem'
import '../List.css'

const List = ({ list, deleteItem }) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const getDatesAndList = (list) => {
        return list.map(item => {
            let parsedDate = new Date(JSON.parse(item.date));

            return `${parsedDate.getUTCDate()}-${months[parsedDate.getMonth()]}-${parsedDate.getUTCFullYear()}`;
        });
    }


    console.log(getDatesAndList(list));

    return (
        <div>
            <ul className="todo-list">
            {list.map((item) => (
                <ListItem todo={item} deleteItem={() => deleteItem(item.id)}/>
            ))}
            </ul>
        </div>
    )
}

export default List;