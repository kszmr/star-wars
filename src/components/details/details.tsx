import { CircularProgress, Grid, Button } from "@material-ui/core";
import { SWAPIEndpoint } from "../../api/generic-api";
import { getDetailData } from "../../api/controller-defs"
import { Field } from "./field";
import { useDetail } from "./use-detail";
import { People } from "../../api/schemas/people"
import { GenericSchema } from './../../api/schemas/generic-schema';

interface DetailProps {
    id: number;
    controller: SWAPIEndpoint;
}

export const Detail = <T extends GenericSchema>(props: DetailProps) => {
    const {id, controller} = props;
    const {isLoading, result, error} = useDetail<T>(id, controller);
    const columns = getDetailData(controller);

    if (isLoading) return <div className={"center"}><CircularProgress/></div>
    if (!result) return null;
    return (
        <Grid container direction={"column"} spacing={2} alignItems={'stretch'}>
            <Grid>
                {Object
                    .entries(result)
                    .filter(item => {
                        const [key] = item;
                        return columns?.find(field => field === key);
                    })
                    .map(item => {
                        const [key, value]:any = item;
                        return <Field name = {key} value = {value}/>
                    })}
            </Grid>
            <Grid>
                <Button variant={'outlined'}>Previous</Button>
            </Grid>
        </Grid>
    )
}