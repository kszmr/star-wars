import { genericController, SWAPIEndpoint } from './../../api/generic-api';
import { useAsync, AsyncReturnType } from './../../common/hooks/use-async';
import { useMemo } from "react";

export const useDetail = <T> (id:number, controllerName: SWAPIEndpoint)
:AsyncReturnType<T> => {
    const controller = useMemo(() => genericController<T>(controllerName).getById(id),[controllerName, id]);
    const {error, isLoading, result} = useAsync<T>(controller);

    return {error, isLoading, result};
} 