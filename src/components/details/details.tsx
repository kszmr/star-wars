import { CircularProgress, Grid } from "@material-ui/core";
import { SWAPIEndpoint } from "../../api/generic-api";
import { getDetailData } from "../../api/controller-defs"
import {field} from "./field";

interface DetailProps {
    id: number;
    controller: SWAPIEndpoint;
}

const Detail = (props: DetailProps) => {
    const {id, controller} = props;
    const {isLoading, result, error} = useDetail(id, controller);
    const columns = getDetailData(controller);

    if (isLoading) return <div><CircularProgress/></div>
    if (!result) return null;
    return (
        <Grid container direction={"column"} spacing={2} alignItems={'stretch'}>
            <Grid>
                {Object
                    .entries(results)
                    .filter(item => {
                        const [key] = items;
                        return columns?.find(field => field === key);
                    })
                    .map(item => {
                        const [key, value] = item;
                        return <Field name = {key} value = {value}/>
                    })}
            </Grid>
            <Grid>
                <Button variant={'outlined'}>Previous</Button>
            </Grid>
        </Grid>
    )
}