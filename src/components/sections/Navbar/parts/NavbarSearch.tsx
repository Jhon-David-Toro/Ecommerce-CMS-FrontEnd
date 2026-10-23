"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import type { SubmitEvent } from "react";

import { SEARCH_LABEL } from "../Navbar.constants";
import { getSearchHref } from "../Navbar.utils";
import styles from "../Navbar.module.scss";

/**
 * Navbar/Search: product search box that opens the results page on submit.
 *
 * @returns The search form.
 */
export const NavbarSearch = () => {
  const router = useRouter();

  /**
   * Opens the results page for the typed text.
   *
   * @param event Submit event of the search form.
   */
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("search") ?? "");
    if (query.trim()) router.push(getSearchHref(query));
  };

  return (
    <form role="search" className={styles.navbar__search} onSubmit={handleSubmit}>
      <label htmlFor="search" className={styles.navbar__search_icon}>
        <MagnifyingGlassIcon />
      </label>
      <input
        type="search"
        id="search"
        name="search"
        placeholder={`${SEARCH_LABEL}...`}
        aria-label={SEARCH_LABEL}
        className={styles.navbar__search_input}
      />
    </form>
  );
};
