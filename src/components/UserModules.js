import React, {
  useCallback,
  useState,
  useEffect,
  createContext,
  useMemo,
} from "react";
import DataTable from "./DataTable";
import { v4 as uuid } from "uuid";
import { GetUsers } from "./../APIs/GetUsers";

export const UserContext = createContext();

export default function UserModules() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetUsers().then(setUsers);
  }, []);

  const adduser = useCallback((user) => {
    setUsers((currentusers) => [
      ...currentusers,
      { ...user, id: uuid(), phone: +user.number },
    ]);
  }, []);

  const edituser = useCallback(
    (newuser) => {
      setUsers(
        users.map((user) => (user.id === newuser.id ? (user = newuser) : user))
      );
    },
    [users]
  );

  const deleteuser = useCallback((e, idx) => {
    setUsers((olduser) => olduser.filter((user) => user.id !== idx));
  }, []);

  const contextValue = useMemo(
    () => ({
      users,
      adduser,
      edituser,
      deleteuser,
    }),
    [users, adduser, edituser, deleteuser]
  );
  return (
    <UserContext.Provider value={contextValue}>
      <div>
        <DataTable />
      </div>
    </UserContext.Provider>
  );
}
