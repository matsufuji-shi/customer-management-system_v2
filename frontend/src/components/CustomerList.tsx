    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { getLists } from "../pages/CustomerListPage";
    import { Customer } from "../types/customer";
    import SearchBar from "./SearchBar";
    import "../App.css"


    function CustomerList() {
        const [customer, setCustomer] = useState<Customer[]>([]);
        const [filterCustomer, setFilterCustomer] = useState<Customer[]>([]);

        const navigate = useNavigate();
        const listHeader = ["顧客名", "メールアドレス", "電話番号", "会社名", "詳細"];

    // データ取得
        const fetchLists = async () => {
        try {
            const data = await getLists();
            setCustomer(data);
        setFilterCustomer(data);  // 初期表示はフィルターなし
        } catch (error) {
            console.error("Failed to fetch customer", error);
        }
        };

        useEffect(() => {
        fetchLists();
        }, []);

        const searchToData = (SearchBarData: string): void => {
        console.log(SearchBarData);
        switch (SearchBarData) {
            case "":
            setFilterCustomer(customer);  // 顧客リストをそのまま設定
            break;
            default:
            const filtered = filterCustomer.filter((c) =>
                c.name.toLowerCase().includes(SearchBarData.toLowerCase())
            );
            console.log(filtered);
            setFilterCustomer(filtered);
        }
    };

    // 顧客詳細ページへ遷移
        const goToGetCustomers = (id: number | undefined) => {
        if (id !== undefined) {
            navigate(`/detail/${id}`);
        } else {
            console.error("ID is undefined");
        }
        };


        return (
        <div className="listPages">
            <h1>顧客一覧</h1>
            <SearchBar searchToData={searchToData}/>

            <table className="listTable">
            <thead>
                <tr>
                {listHeader.map((header, i) => (
                    <th key={i}>{header}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {(filterCustomer.length > 0 ? filterCustomer : customer).map(
                (cust) => (
                    <tr key={cust.id}>
                    <td>{cust.name}</td>
                    <td>{cust.email}</td>
                    <td>{cust.phone}</td>
                    <td>{cust.company_name}</td>
                    <td>
                    <button onClick={() => goToGetCustomers(cust.id)} className="listBtn">
                        詳細
                    </button>
                    </td>
                </tr>
                )
            )}
            </tbody>
        </table>
        </div>
    );
    }

    export default CustomerList;