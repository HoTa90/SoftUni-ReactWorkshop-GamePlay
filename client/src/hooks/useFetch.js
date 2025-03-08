import { useEffect, useState } from "react"


const useFetch = (url, method = 'GET') => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);


    const postData = (postData) => {
        setOptions({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        })
    }


    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async (fetchOptions) => {
            setIsPending(true)

            try {

                const response = await fetch(url, { ...fetchOptions, signal: abortController.signal });

                if (!response.ok) {
                    throw new Error(response.statusText)
                }

                const json = await response.json();
                setData(json);
                setError(null);

            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('The Fetch was aborted!')
                } else {
                    setError('Coud not Fetch Data');
                    console.log(err.message);
                }

            } finally {
                setIsPending(false)
            }

        }

        if (method === 'GET') {
            fetchData()
        }

        if (method === 'POST' && options) {
            fetchData(options)
        }

        return () => {
            abortController.abort();
        }

    }, [url, options, method])

    return { data, isPending, error, postData }
}


export default useFetch