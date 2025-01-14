"use client";

export default function Error({ error }: { error: Error }) {
  return <div>Failed to load property: {error.message}</div>;
}
