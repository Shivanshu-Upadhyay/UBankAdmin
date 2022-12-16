import React, { useEffect, useState } from "react";
import CommonLimit from "./CommonLimit";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditLimit() {
    const [merchants, setMerchants] = useState("");
    const [gateway, setGateway] = useState("");
    const [currency, setCurrency] = useState("");
    const [min_amount, setMin_amount] = useState("");
    const [max_amount, setMax_amount] = useState("");
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
            `${baseUrl}/readOneLimit`,
            formData,
            config
            );
            setMerchants(result.data.user_id)
            setGateway(result.data.gateway);
            setCurrency(result.data.currency);
            setMin_amount(result.data.min);
            setMax_amount(result.data.max);
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
        formData.append("user_id", merchants);
        formData.append("gateway", gateway);
        formData.append("currency", currency);
        formData.append("max", max_amount);
        formData.append("min", min_amount);
        formData.append("id",id)
        const config = {
            headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
            },
        };
        let result = await axios.post(
            `${baseUrl}/editLimit`,
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
        navigate("/Limit");
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <>
        <Header title="Set Limit" path="/Limit" />
        <CommonLimit
            merchants={merchants}
            setMerchants={setMerchants}
            gateway={gateway}
            setGateway={setGateway}
            currency={currency}
            setCurrency={setCurrency}
            min_amount={min_amount}
            setMin_amount={setMin_amount}
            max_amount={max_amount}
            setMax_amount={setMax_amount}
            handleSubmit={handleSubmit}
            buttonText="Update"
        />
        </>
    );
}

export default EditLimit;
