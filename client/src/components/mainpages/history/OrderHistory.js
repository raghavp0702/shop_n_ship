import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.UserAPI.history;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: {
              Authorization: token,
            },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: {
              Authorization: token,
            },
          });

          setHistory(res.data);
        }

        // console.log(res);
      };
      getHistory();
    }
  }, [token, isAdmin,setHistory]);

  return (
    <div className="history-page">
      {history.length ? (
        <div>
          {" "}
          <h2>History</h2> <h4>You have {history.length} ordered</h4>
        </div>
      ) : (
        <h2>
          You havent Bought Anything yet <Link to="/shop">Click here</Link> to
          Shop Now{" "}
        </h2>
      )}

      {/* { console.log({history})} */}
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchased</th>
            <th> View</th>
          </tr>
        </thead>
        <tbody>
          {history.map((items) => {
            return (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>View </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
