"use client";

import { getQueriesByEmail } from "@/actions/ai";
import QueryTable from "@/components/table/query-table";
import { Button } from "@/components/ui/button";
import { QueriesResponse } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function HistoryPage() {
  const [queries, setQueries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perPage, setPerPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "N/A";

  const fetchQueries = async (email: string, page = 1, pageSize = 1) => {
    setLoading(true);
    try {
      const queriesResponse = (await getQueriesByEmail(
        email,
        page,
        pageSize
      )) as QueriesResponse;

      setQueries(queriesResponse.queries || []);
      setTotalPages(queriesResponse.totalPages || 0);
    } catch (error) {
      console.error("Error fetching queries:", error);
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async (email: string, page = 1, pageSize = 1) => {
    setLoading(true);
    try {
      const loadmoreRes = (await getQueriesByEmail(
        email,
        page,
        pageSize
      )) as QueriesResponse;
      setQueries([...queries, ...loadmoreRes.queries]);
      setTotalPages(loadmoreRes.totalPages);
    } catch (error) {
      console.error("Error loading more queries:", error);
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail && page === 1) {
      fetchQueries(userEmail, page, perPage);
    }
  }, [userEmail, page]);

  useEffect(() => {
    if (page > 1 && userEmail) {
      loadMore(userEmail, page, perPage);
    }
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin mx-2" />
      </div>
    );
  }

  return (
    <>
      <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">History</h1>
        <p className="text-sm text-gray-500">Your previous search history</p>
      </div>

      <div className="p-5 rounded-lg flex flex-col justify-center">
        <QueryTable data={queries} />
      </div>

      <div className="text-center my-5">
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)} disabled={loading}>
            {loading ? (
              <Loader2Icon className="animate-spin mx-2" />
            ) : (
              "Load More"
            )}
          </Button>
        )}
      </div>
    </>
  );
}
