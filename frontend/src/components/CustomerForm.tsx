import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../services/api";
import {Customer, FormError} from "../types/customer"

interface CustomerFormProps {
    onListAdded?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onListAdded }) => {
    const { id } = useParams<string>(); // id は string 型
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    // まとめて管理する formState
    const [formState, setFormState] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
    company_name: "",
    });

    const [error, setError] = useState<FormError>({});

    const [originalFormState, setOriginalFormState] = useState<Customer>(formState);

    // 編集モードならデータ取得
    useEffect(() => {
    if (isEditing) {
        const fetchCustomer = async () => {
        try {
            const { data } = await axiosInstance.get(`/customers/${id}`);
            setFormState({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            company_name: data.company_name,
            });
            setOriginalFormState({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            company_name: data.company_name,
            });
        } catch (error) {
            console.error("タスクの取得に失敗しました", error);
        }
        };
        fetchCustomer();
    }
    }, [id, isEditing]);

    // バリデーションチェック
    const validateForm = (): boolean => {
    const { name, email, phone, address } = formState;
    const newError: FormError = {};

    // 必須項目チェック
    if (!name) newError.name = "顧客名は必須です";
    if (!email) newError.email = "メールアドレスは必須です";
    if (!phone) newError.phone = "電話番号は必須です";
    if (!address) newError.address = "住所は必須です";

    // メールアドレスの形式チェック
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (email && !emailPattern.test(email)) {
        newError.email = "無効なメールアドレスの形式です";
    }

    // 電話番号の形式チェック
    const phonePattern = /^\d{2,4}-\d{3,4}-\d{3,4}$/;
    if (phone && !phonePattern.test(phone)) {
        newError.phone = "無効な電話番号の形式です";
    }

    setError(newError);
    return Object.keys(newError).length === 0;  // エラーがない場合のみ送信可能
    };

    // 共通の変更ハンドラー
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    };

    // 保存処理
    const handleSave = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;  // バリデーション失敗なら保存しない
    
    const { name, email, phone, address } = formState;
    
    try {
        if (isEditing) {
        await axiosInstance.put(`/customers/${id}`, formState);
        console.log("タスクが更新されました:", name, email, phone, address);
        } else {
        // 新規追加処理を追加
        await axiosInstance.post("/customers", formState);
        console.log("タスクが追加されました:", name, email, phone, address);

        setFormState({
            name: "",
            email: "",
            phone: "",
            address: "",
            company_name: "",
        });
        if (onListAdded) onListAdded();
        }
        navigate("/");
    } catch (error) {
        console.error("タスクの処理に失敗しました", error);
    }
    };

    // キャンセル処理
    const handleCancel = (): void => {
    setFormState(originalFormState);
    navigate(`/detail/${id}`);
    };

    return (
    <div>
        <h2 className="title">顧客追加/編集</h2>

        <form onSubmit={handleSave} className="formGroup">
        <div className="form">
            <div>顧客名：</div>
            <input
            type="text"
            name="name"
            placeholder="顧客名を入力"
            value={formState.name}
            onChange={handleChange}
            />
            {error.name && <div style={{ color: "red" }}>{error.name}</div>}

            <div>メールアドレス：</div>
            <input
            type="email"
            name="email"
            placeholder="メールアドレスを入力"
            value={formState.email}
            onChange={handleChange}
            />
            {error.email && <div style={{ color: "red" }}>{error.email}</div>}

            <div>電話番号：</div>
            <input
            type="tel"
            name="phone"
            placeholder="電話番号を入力"
            value={formState.phone}
            onChange={handleChange}
            />
            {error.phone && <div style={{ color: "red" }}>{error.phone}</div>}

            <div>住所：</div>
            <input
            type="text"
            name="address"
            placeholder="住所を入力"
            value={formState.address}
            onChange={handleChange}
            />
            {error.address && <div style={{ color: "red" }}>{error.address}</div>}

            <div>会社名：</div>
            <input
            type="text"
            name="company_name"
            placeholder="会社名を入力"
            value={formState.company_name}
            onChange={handleChange}
            />

            <br/>
        </div>
        <div className="formButton">
            <button type="submit">{isEditing ? "保存" : "追加"}</button>
            {isEditing && (
            <button type="button" onClick={handleCancel}>
                キャンセル
            </button>
            )}
        </div>
        </form>

        {/* エラーメッセージの表示 */}
        {error.global && (
        <div style={{ color: "red", marginTop: "1rem" }}>
            {error.global}
        </div>
        )}
    </div>
    );
}

export default CustomerForm;