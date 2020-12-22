import { CircularProgress } from "@material-ui/core";
import { SWAPIEndpoint } from "../../api/generic-api";

interface DetailProps {
    id: number;
    controller: SWAPIEndpoint;
}

const Detail = (props: DetailProps) => {
    const {id, controller} = props;
    const {isLoading, result, error} = useDetail(id, controller)

    if (isLoading) return <div><CircularProgress/></div>
    if (!result) return null;
}