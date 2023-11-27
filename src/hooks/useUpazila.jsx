import { useEffect, useState } from "react";

const useUpazila = () => {

    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('upazilas.json')
            .then(res => res.json())
            .then(data => {
                setUpazilas(data);
                setLoading(false);
            })
    }, [])


    return [upazilas, loading];
};

export default useUpazila;