"use client";
import useOriginHook from "@/hooks/use-origin-hook";
import { useParams } from "next/navigation";
import React from "react";
import ApiAlert from "./apiAlert";

interface Props {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<Props> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origin = useOriginHook();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      ></ApiAlert>
      <ApiAlert
        title="GET"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      ></ApiAlert>
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      ></ApiAlert>
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      ></ApiAlert>
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      ></ApiAlert>
    </>
  );
};

export default ApiList;
