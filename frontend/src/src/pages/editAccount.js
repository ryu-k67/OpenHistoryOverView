// edit.js

import React, { useState } from 'react';

const EditAccount = () => {
  const [username, setUsername] = useState(''); // 初期値はユーザーの現在の情報に設定
  const [email, setEmail] = useState(''); // 初期値はユーザーの現在の情報に設定
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ここでAPIを呼び出してユーザー情報を更新するなどの処理を実行

    // 更新が成功した場合、リダイレクトなどの処理を行う
  };

  return (
    <div>
      <h1>Edit Account Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditAccount;
