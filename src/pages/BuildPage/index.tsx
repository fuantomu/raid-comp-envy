import { FC, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBuild } from "../../services/backend";
import useErrorHandler from "../../utils/useErrorHandler";

const BuildPage: FC = () => {
  const { buildId } = useParams<{ buildId?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [build, setBuild] = useState<{ test: string }>();
  const history = useHistory();
  const [common] = useTranslation("common");
  const handleError = useErrorHandler();

  useEffect(() => {
    if (!buildId) {
      history.push(common("urls.home"));
    } else {
      getBuild(buildId)
        .then(({ data: { test } }) => {
          setBuild({ test: test });
          setIsLoading(false);
        })
        .catch(handleError);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <p>Build: {buildId}</p>
      <p>Test: {build?.test}</p>
    </div>
  );
};

export default BuildPage;
