import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLists } from "../pages/CustomerListPage";
import { Customer } from "../types/customer";

function CustomerList() {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [filterCustomer, setFilterCustomer] = useState<Customer[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

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

  // 顧客詳細ページへ遷移
  const goToGetCustomers = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/detail/${id}`);
    } else {
      console.error("ID is undefined");
    }
  };

  // 顧客追加ページへ遷移
  const goToAddCustomers = () => {
    navigate("/add-form");
  };

  // フィルタリング
  const searchToData = (keyword: string) => {
    const filtered = customer.filter((cust) =>
      cust.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilterCustomer(filtered);  // フィルタリング後のデータをセット
  };

  return (
    <div>
      <h1>顧客一覧</h1>

      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="顧客名で検索"
        className="searchBerInput"
      />
      <button
        onClick={() => searchToData(searchInput)} // ボタンを押したタイミングでフィルタリング
        className="searchBarButton"
      >
        フィルタリング
      </button>
      <button onClick={goToAddCustomers} className="searchBarButton">
        顧客情報追加
      </button>

      <table>
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
                  <button onClick={() => goToGetCustomers(cust.id)}>
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