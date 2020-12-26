import { Button } from "@material-ui/core";
import { FC, useState } from "react";
import Loading from "../../components/Loading";

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Button color="primary">Hello World</Button>
    </>
  );
};

export default HomePage;
