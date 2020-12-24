import { FC, useState } from "react";
import Loading from "../../components/Loading";

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loading />;
  }

  return <>Home</>;
};

export default HomePage;
