import React, {useState} from 'react';
import {genericController} from './api/generic-api';

export const App = () => {
    const [schema, setSchema] = useState({description: ''});
    const {getSchema} = genericController('films');
    getSchema().then(
        value => setSchema(value)
    )
    return (
        <div>{schema.description}</div>
    )
}
