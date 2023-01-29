import React from "react";
import { useRouter } from "next/router";

const Result = () => {
 const router = useRouter();
 const { result } = router.query;
 return <div>{result}</div>;
};

export default Result;
