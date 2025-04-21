import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {getLists} from "../pages/CustomerListPage";
import { Customer } from "../types/customer"; 

function CustomerList(){
    const [customer, setCustomer] = useState<Customer[]>([]);
    const [filterCustomer,setFilterCustomer] = useState<Customer[]>([]);
    const navigate = useNavigate();
    const listHeader =["顧客名", "メールアドレス", "電話番号", "会社名" , "詳細"];

    const fetchLists = async () => {
        try {
          const data = await getLists();  // APIから取得
          setCustomer(data);  // 取得したタスクを状態にセット
          setFilterCustomer(data); //フィルタリング状態もセット
        } catch (error) {
          console.error("Failed to fetch customer", error);
        }
      };
      // 初期の顧客リスト取得
  useEffect(() => {
    fetchLists();
  }, []);

  // 顧客詳細ページへ移動
  const goToGetCustomers = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/detail/${id}`);
    } else {
      console.error("ID is undefined");
    }
  };

  return(
    <div>
      <h1>顧客一覧</h1>
      <table>
        <thead>
          <tr>
            {listHeader.map((Header,i) => 
            <th key={i}>{Header}</th>)}
          </tr>
        </thead>
        <tbody>
        {customer.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.company_name}</td>
            <td><button onClick={() => goToGetCustomers(customer.id)}>詳細</button></td>
          </tr>
        ))}
          </tbody>
      </table>
      </div>
  )

}

export default CustomerList;