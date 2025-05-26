"use client";

import TableIncidents from "@/components/TableIncidents";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function IncidentsPage() {
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    // Simula carga
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Skeleton height="404px" width="100%" />
  ) : (
    <div>
      <TableIncidents />
    </div>
  );
}
