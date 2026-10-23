"use client";

import { Spinner } from "@/components/ui/Spinner";
import { getContent } from "@/lib/content/content.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_ARGS } from "./AdminContent.constants";
import { ContentFormBody } from "./parts/ContentFormBody";

/**
 * AdminContent: loads the editable storefront content and shows the form to change it.
 *
 * @returns The site content page.
 */
export const AdminContent = () => {
  const { data, isLoading } = useQuery(getContent, NO_ARGS);

  if (isLoading || !data) return <Spinner label="Loading site content" />;

  return <ContentFormBody content={data} />;
};
