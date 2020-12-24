import { genericController, PageableResponse, PageData } from './api/generic-api';
import { Film } from './api/schemas/films';
import { useEffect, useState } from 'react';
import { Detail } from "./components/details/details";
import "./styles.css";

export const App = () => {
    return (
        <Detail<Film> id={1} controller={"films"}/>
    )
}