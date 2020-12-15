import React, {useEffect, useState} from 'react';
import {genericController} from './api/generic-api';
import {People} from './api/schemas/people';

export const App = () => {
    const [schema, setSchema] = useState<People>();
    const {getById} = genericController<People>('people');
    useEffect(() => {
        getById(1).then(value => setSchema(value));
    }, [])
    
    return (
        <div>{schema ? `${schema.name} is a ${schema.gender} character.` : null}</div>
    )
}