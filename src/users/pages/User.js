import React, { useEffect, useState } from "react";
import Userlist from "../components/Userslist";

export default function User() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/`);
        const responseData = await response.json();

        setLoadedUsers(responseData.users);
        setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          setError(error.message);
      }
    };
    sendRequest();
  }, []);
  return (
      <div>
          {loadedUsers &&   <Userlist items={loadedUsers} />}
      </div>
  );
}
