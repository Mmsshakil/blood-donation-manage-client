import { useEffect, useState } from "react";

const useDistrict = () => {

    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch('http://localhost:5000/districts')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setDistricts(data);
                setLoading(false);
            })
    }, [])

    return [districts, loading];
};

export default useDistrict;