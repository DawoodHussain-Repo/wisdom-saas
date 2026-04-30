"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
  }, [searchQuery, searchParams, router, pathname]);

  return (
    <div
      className="rounded-lg relative h-fit px-3 py-2 gap-2 flex items-center transition-all duration-200"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
    >
      <Image src={"/icons/search.svg"} alt="Search" width={15} height={15} />
      <input
        type="text"
        placeholder="Search Companions ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="outline-none bg-transparent"
        style={{ color: "var(--text-primary)" }}
        id="search-companions-input"
      ></input>
    </div>
  );
};

export default SearchInput;
