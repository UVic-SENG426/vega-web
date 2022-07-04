import SimplePageLayout from "../templates/SimplePageLayout.js";
import { UserContext } from "../../auth/UserProvider.js";
import { useState, useContext, useEffect, useRef } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { addSecret, deleteSecret, fetchSecrets, updateSecret } from "../../service/Vault/SecretVault.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageSecrets = (props) => {
  const [inputName, setInputName] = useState("");
  const inputRef = useRef("");
	const {user} = useContext(UserContext);

  const [showAdd, setShowAdd] = useState(0);
  const [showEdit, setShowEdit] = useState(null);
  const [showShare, setShowShare] = useState(null);

  const [data, setData] = useState([]);

  const getSecrets = async () => {
    if(user.username  && user.jwt) {
      let list = await fetchSecrets(user.username,user.jwt);
      setData(list);
      console.log(list)
    }
  }

  useEffect(() => {
    getSecrets();
  }, [user])

  const handleClick = () => {
    setShowAdd(1);
  };

  const handleClickSubmit = () => {
    if (inputName != "") {
      let submitObject = {
        value: inputName,
        username: user.username,
      };
      
      addSecret(submitObject, user.jwt).then(res => {
        console.log(res)
      })
      
      window.location.reload()
    }
  };

  function handleClickSubmitEdit(secret) {
    if (inputRef.current.value != "") {
      let submitObject = {
        value: inputRef.current.value
      };
      
      updateSecret(secret, submitObject, user.jwt).then(res => {
        console.log(res)
      })

      window.location.reload()
    }
  };

  function handleClickSubmitShare(secret) {
    if (inputRef.current.value != "") {
      let submitObject = {
        value: secret,
        username: inputRef.current.value,
      };

      addSecret(submitObject, user.jwt).then(res => {
        console.log(res)
      })

      window.location.reload()
    }
  };

  const handleChangeName = (event) => {
    setInputName(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeSecret = (event) => {
    console.log(event.target.value);
  };

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <SimplePageLayout>
      <Table>
        <thead>
          <tr>
            <td>
              <h3>Secret List</h3>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button onClick={handleClick}>+ Add Secret</button>
            </td>
          </tr>
          <tr>
            <td>
              <h5>Secret value</h5>
            </td>
            <td>
              <h5>Secret owned by</h5>
            </td>
            <td>
              <h5>Secret creation date</h5>
            </td>
            <td></td>
            <td></td>
          </tr>
          {(() => {
            if (showAdd != 0) {
              return (
                <tr>
                  <td>
                    <input
                      type="text"
                      id="message"
                      name="message"
                      placeholder="Enter Secret Value"
                      onChange={handleChangeName}
                      autoComplete="off"
                    ></input>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={handleClickSubmit}>*SUBMIT*</button>
                  </td>
                </tr>
              );
            } else {
              return <div></div>;
            }
          })()}

          {data.filter( row => {
            let filterCheck = true
            const date = new Date(row.date)
            
            if (dateRange[0]) {
              filterCheck = filterCheck && (new Date(dateRange[0]) <= date)
            }
            if (dateRange[1]) {
              filterCheck = filterCheck && (new Date(dateRange[1]) >= date)
            }
            //if filterCheck comes back `false` the row is filtered out
            return filterCheck;
          }
          ).map(function (Secret, index) {
            const handleDelete = async (secret, index, e) => {
              await deleteSecret(secret,user.jwt);
              setData(data.filter((v, i) => i !== index));
            };

            const handleEdit = (index, e) => {
              setShowEdit(index);
            };

            const handleShare = (index, e) => {
              setShowShare(index);
            };

            if (showEdit == index) {
              return (
                <tr>
                  <td>
                    <input
                      ref={inputRef}
                      type="text"
                      id="editmessage"
                      name="editmessage"
                      placeholder="Enter Secret Value"
                      autoComplete="off"
                    ></input>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={() => handleClickSubmitEdit(Secret.secret)}>*SUBMIT*</button>
                  </td>
                </tr>
              );
            } else if (showShare == index) {
              return (
                <tr>
                  <td>
                    <input
                      ref={inputRef}
                      type="email"
                      id="sharemessage"
                      name="sharemessage"
                      placeholder="Enter Email Address"
                      autoComplete="off"
                    ></input>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={() => handleClickSubmitShare(Secret.value)}>*SUBMIT*</button>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr>
                  <td>{Secret.value}</td>
                  <td>{Secret.username}</td>
                  <td>{Secret.date}</td>
                  <td>
                    {" "}
                    <button onClick={(e) => handleShare(index, e)}>Share</button>
                    {" "}
                    <button onClick={(e) => handleEdit(index, e)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={(e) => handleDelete(Secret.secret, index, e)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          })}
          <tr>
            <td>
              <h5>Filter:</h5>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
      </Table>
    </SimplePageLayout>
  );
};
export default ManageSecrets;
