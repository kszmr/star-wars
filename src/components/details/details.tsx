import { CircularProgress } from "@material-ui/core";
import { SWAPIEndpoint } from "../../api/generic-api";
import { getDetailData } from "../../api/controller-defs"

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
        
    )
}