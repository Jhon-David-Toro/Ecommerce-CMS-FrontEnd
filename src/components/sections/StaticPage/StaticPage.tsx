"use client";

import { useParams } from "next/navigation";

import { RecordGate } from "@/components/patterns/RecordGate";
import { getPublishedPage } from "@/lib/content/content.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NOT_FOUND } from "./StaticPage.constants";
import { PageContent } from "./parts/PageContent";

/**
 * StaticPage: content page written in the admin panel and found by the slug of the address.
 *
 * @returns The page content, or a not found message.
 */
export const StaticPage = () => {
  const params = useParams<{ slug: string }>();
  const { data: page, isLoading } = useQuery(getPublishedPage, params.slug);

  return (
    <RecordGate record={page} isLoading={isLoading} loadingLabel="Loading page" notFound={NOT_FOUND}>
      {(found) => <PageContent page={found} />}
    </RecordGate>
  );
};
