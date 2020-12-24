import { useState, useEffect } from 'react';

export interface AsyncReturnType <T> {
    isLoading: boolean;
    error: boolean;
    result: T | undefined;
}

export const useAsync = <T> (asyncFn: Promise<T>):AsyncReturnType<T> => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState<T> ();
    
    useEffect(() => {
        const fn = async() => {
            setIsLoading(true);
            setError(false);
            try {
                const result = await asyncFn;
                setIsLoading(false);
                setResult(result);
            } catch (error) {
                setIsLoading(false);
                setError(true);
            }
        }
        fn();
    }, [setIsLoading, setResult, setError, asyncFn])

    return {isLoading, error, result};
}