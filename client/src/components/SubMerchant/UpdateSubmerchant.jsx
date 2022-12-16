import React, { useEffect, useState } from "react";
import CommonSubmerchant from "./CommonSubmerchant";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateSubmerchant() {
    const [name, setName] = useState("");
    const [sec_key, setSec_key] = useState("");
    const [salt, setSalt] = useState("");
    const [percentage, setPercentage] = useState("");
    const [mid, setMid] = useState("");
    const [merchant_ids, setMerchant_ids] = useState("");
    let { id } = useParams();
    const auth = localStorage.getItem("admin");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            let formData = new FormData();
            formData.append("id", id);
            const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
            },
            };
            let result = await axios.post(
            `${baseUrl}/readOneSubmerchant`,
            formData,
            config
            );
            setName(result.data.name);
            setSec_key(result.data.sec_key);
            setSalt(result.data.salt);
            setPercentage(result.data.percentage);
            setMid(result.data.mid);
            setMerchant_ids(result.data.merchant_ids);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, [id, auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("sec_key", sec_key);
        formData.append("salt", salt);
        formData.append("percentage", percentage);
        formData.append("mid", mid);
        formData.append("merchant_ids", merchant_ids);
        formData.append("id",id)
        const config = {
            headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
            },
        };
        let result = await axios.post(
            `${baseUrl}/editSubmerchant`,
            formData,
            config
        );

        toast.success(result.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigate("/SubMerchant");
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <>
        <Header title="Edit Sub Merchant" path="/SubMerchant" />
        <CommonSubmerchant
            name={name}
            setName={setName}
            sec_key={sec_key}
            setSec_key={setSec_key}
            salt={salt}
            setSalt={setSalt}
            percentage={percentage}
            setPercentage={setPercentage}
            mid={mid}
            setMid={setMid}
            merchant_ids={merchant_ids}
            setMerchant_ids={setMerchant_ids}
            handleSubmit={handleSubmit}
            buttonText="Update"
        />
        </>
    );
}

export default UpdateSubmerchant;
