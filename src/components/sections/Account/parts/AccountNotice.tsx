import { Alert } from "@/components/ui/Alert";

import type { AccountNoticeProps } from "../Account.types";

/**
 * Account/Notice: tells the customer how saving a form went; nothing shows before the first save.
 *
 * @param props Component props.
 * @param props.notice Message and whether it is a failure.
 * @returns The alert, or null when there is no message.
 */
export const AccountNotice = ({ notice }: AccountNoticeProps) =>
  notice.message ? <Alert tone={notice.failed ? "error" : "success"}>{notice.message}</Alert> : null;
