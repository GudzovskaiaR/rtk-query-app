import {
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} from './redux';
import { useState } from 'react';
import "./App.css"

function App() {
  const [count, setCount] = useState('');
  const [newUser, setNewUser] = useState('');
  const { data = [], isLoading } = useGetUserQuery(count);
  const [addUser, { isError }] = useAddUserMutation();
  const [deleteUser, { error }] = useDeleteUserMutation();
  const handlerNewUser = async () => {
    if (newUser) {
      const user = { login: newUser, role: 'user' };
      await addUser(user).unwrap();
      setNewUser('');
    }
  };
  const handlerDeleteUser = async (id) => {
    await deleteUser(id).unwrap();
  };
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div className="container">
      <h1> RTK-Query</h1>
      <div className="select-count">
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="add-user">
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        ></input>
        <button onClick={handlerNewUser}>add user</button>
      </div>
      <div className="users">
        <ul>
          {data.map((user) => (
            <div key={user.id} className='user'>
              <li>{`${user.id}.${user.login}:${user.role}`}</li>
              <button
                id={user.id}
                onClick={(e) => handlerDeleteUser(e.target.id)}
              >
                delete user
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
