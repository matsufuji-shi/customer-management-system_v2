import request from 'supertest';
import app from '../app';  // Expressアプリケーションのエントリーポイント

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company_name: string;
}

describe('POST /customers', () => {
  it('新しい顧客を追加する - 成功ケース', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        name: '石川 せいや',
        email: 'seiya.ishikawa@example.com',
        phone: '090-1234-5678',
        address: '大阪府堺市',
        company_name: 'ABC株式会社'
      });

    expect(response.statusCode).toBe(201);  // 成功の場合、ステータスコード201
    expect(response.body).toHaveProperty('id');  // 返されたオブジェクトにIDが含まれているか
    expect(response.body.name).toBe('石川 せいや');
  });

  it('必須項目が未入力の場合 - エラーケース', async () => {
    const response = await request(app)
      .post('/api/customers')
      .send({
        email: 'soshina.shimohuri@example.com',  // 名前が不足している
        phone: '090-1234-5678',
        address: '大阪府堺市',
        company_name: 'ABC株式会社' 
      });

    expect(response.statusCode).toBe(400);  // エラーステータス
    expect(response.body.message).toBe('全ての必須項目を入力してください。');
  });
});

describe('GET /customers', () => {
  it('顧客一覧を取得する - 成功ケース', async () => {
    const response = await request(app)
      .get('/api/customers');

    expect(response.statusCode).toBe(200);  // 成功の場合、ステータスコード200
    expect(Array.isArray(response.body)).toBe(true);  // 顧客データが配列であること
  });
});

describe('PUT /customers/:id', () => {
  let customerId: string;

  beforeAll(async () => {
    // テスト用顧客を作成してIDを取得
    const response = await request(app)
      .post('/api/customers')
      .send({
        name: 'テスト 顧客',
        email: 'test.customer@example.com',
        phone: '090-1234-0000',
        address: '大阪府大阪市',
        company_name: 'XYZ株式会社'
      });
    customerId = response.body.id;  // 作成した顧客のIDを保持
  });

  it('顧客情報を更新する - 成功ケース', async () => {
    const response = await request(app)
      .put(`/api/customers/${customerId}`)
      .send({
        name: 'テスト 顧客 更新',
        email: 'test.customer.updated@example.com',
        phone: '090-1234-0001',
        address: '大阪府大阪市更新',
        company_name: 'XYZ株式会社更新'
      });

    expect(response.statusCode).toBe(200);  // 成功の場合、ステータスコード200
    expect(response.body.message).toBe('顧客情報を更新しました');
  });
});

describe('DELETE /customers/:id', () => {
  let customerId: string;

  beforeAll(async () => {
    // テスト用顧客を作成してIDを取得
    const response = await request(app)
      .post('/api/customers')
      .send({
        name: '削除テスト 顧客',
        email: 'delete.test@example.com',
        phone: '090-1234-0002',
        address: '大阪府堺市',
        company_name: 'ABC株式会社'
      });
    customerId = response.body.id;  // 作成した顧客のIDを保持
  });

  it('顧客を削除する - 成功ケース', async () => {
    const response = await request(app)
      .delete(`/api/customers/${customerId}`);

    expect(response.statusCode).toBe(200);  // 成功の場合、ステータスコード200
    expect(response.body.message).toBe('顧客を削除しました');
  });
});