import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticatd user
  const { isLoading, isAuthenticated, isFetching } = useUser();
  console.log("step 1 pass");

  //2. If their is no Authenticated user,redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
    console.log({ isAuthenticated });
    console.log({ isLoading });
    console.log({ isFetching });
  }, [isAuthenticated, isLoading, navigate, isFetching]);
  console.log("step 2 pass");
  //3. While loading , show the spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  console.log("step 3 pass");
  //4. If there is a user , render the app
  console.log("step 4 pass");

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
