import { useParams } from "react-router-dom";

const ErrorPage = () => {
  const { status } = useParams();
  return <>{status}</>
};

export default ErrorPage;