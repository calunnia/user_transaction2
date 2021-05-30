import "./App.css";
import React, { useState, useEffect } from "react";
import Loading from "./components/Loading/Loading.jsx";
import Pets from "./components/Pets/Pets.jsx";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [deposit, setDeposit] = useState(null);

  const searchInput = (fetchAPIurl, setdatafn) => {
    setLoading(true);
    setData([]);

    //fetch(`api/clients?search=${input}`)
    fetch(fetchAPIurl)
      .then((response) => response.json())
      .then((resadat) => setdatafn(resadat))
      .catch((error) => {
        console.log("error", error);
        setdatafn(null);
      })
      .finally(() => {
        console.log("fetch end");
        setLoading(false);
      });
  };

  useEffect(() => {
    searchInput(`api/users`, setUsers);
    searchInput(`api/transactions`, setTransactions);
    return () => {
      // cleanup
    };
  }, []);

  console.log("data=", data, data ? data.length : 0);

  console.log("users=", users, users ? users.length : 0);

  console.log("trans=", transactions, transactions ? transactions.length : 0);

  //ezt kell megirni !!!
  const getAllDeposit = (users, transactions, userName) => {
    console.log("getAllDepositFn");
    let sum = 0;

    let currentUser = users.filter((user) => user.name.includes(userName));
    console.log("currentUser=", currentUser[0]);
    //currentUser === currentUser[0];

    let currentTransaction = transactions.filter(
      (transaction) => transaction.userId === currentUser.id
    );

    console.log("currentTransaction=", currentTransaction);

    let depositFilter = currentTransaction.filter(
      (transaction) => transaction.type === 'deposit'
    );
    console.log("depositFilter=", depositFilter);

    depositFilter.map((item) => (sum = sum + item.amount));
    return sum;
  };

  return (
    <>
      <br />

      <hr />
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="users">
            <p>users = {users ? users.length : 0}</p>
            {users.forEach((elem) => (
              <p>{elem.name}</p>
            ))}
            {users.map((elem) => (
              <p>{elem.name}</p>
            ))}
          </div>
          <hr />
          <p>transactions = {transactions ? transactions.length : 0}</p>
          <input id="name" />
          <button
            onClick={() =>
              setDeposit(
                getAllDeposit(
                  users,
                  transactions,
                  document.getElementById("name").value
                )
              )
            }
          >
            Get All Deposit
          </button>
          <p>{deposit ? <span>result = {deposit}</span> : ""}</p>
        </>
      )}
    </>
  );
};

export default App;
