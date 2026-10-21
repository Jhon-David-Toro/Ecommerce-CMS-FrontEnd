import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { SubmitEvent } from "react";

import type { AdminSearchProps } from "../AdminShell.types";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/Search: search box of the top bar; submitting it opens the product list with that text.
 *
 * @param props Component props.
 * @param props.onSearch Called with the text when the form is submitted.
 * @returns The search form.
 */
export const AdminSearch = ({ onSearch }: AdminSearchProps) => {
  const [text, setText] = useState("");

  /**
   * Sends the text to the parent instead of reloading the page.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(text);
  };

  return (
    <form className={styles.shell__search} role="search" onSubmit={handleSubmit}>
      <MagnifyingGlassIcon className={styles.shell__searchIcon} />
      <input
        type="search"
        value={text}
        placeholder="Search products..."
        aria-label="Search products"
        onChange={(event) => setText(event.target.value)}
      />
    </form>
  );
};
