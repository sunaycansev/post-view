import { useState, useEffect, PropsWithChildren } from "react";
import { prefetchTranslations } from "@/services/translationService";
import { useIsMounted } from "@/hooks/useIsMounted";

type PrefetchWrapperProps = PropsWithChildren<{
  translationKeys?: string[];
}>;

const PrefetchWrapper = ({
  translationKeys,
  children,
}: PrefetchWrapperProps) => {
  const [isPrefetching, setIsPrefetching] = useState(true);
  const isMounted = useIsMounted();

  useEffect(() => {
    setIsPrefetching(true);

    prefetchTranslations(translationKeys)
      .then(() => {
        if (isMounted()) {
          setIsPrefetching(false);
        }
      })
      .catch((error) => {
        console.log("Error prefetching translations", error);

        if (isMounted()) {
          setIsPrefetching(false);
        }
      });
  }, [translationKeys, isMounted]);

  if (isPrefetching) {
    return <div>Loading resources...</div>;
  }

  return <>{children}</>;
};

export default PrefetchWrapper;
