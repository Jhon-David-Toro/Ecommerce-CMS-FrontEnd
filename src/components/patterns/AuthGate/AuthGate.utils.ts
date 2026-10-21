import type { GateStatus, GateStatusInput, LoginRedirectInput } from "./AuthGate.types";

/**
 * Builds the sign in address that brings the user back to a page afterwards.
 *
 * @param next Path to return to once signed in.
 * @returns The sign in address with the return path.
 */
export const buildLoginHref = (next: string) => `/login?next=${encodeURIComponent(next)}`;

/**
 * Sends a visitor without a session to the sign in page, once the session has been checked.
 *
 * @param input Session state and router.
 * @param input.isReady Whether the session has been checked.
 * @param input.user Signed-in user, if any.
 * @param input.router Router used to redirect.
 * @param input.pathname Current path, to come back to after signing in.
 */
export const redirectToLogin = ({ isReady, user, router, pathname }: LoginRedirectInput) => {
  if (isReady && !user) router.replace(buildLoginHref(pathname));
};

/**
 * Works out what the gate should show.
 *
 * @param input Session state and required role.
 * @param input.isReady Whether the session has been checked.
 * @param input.user Signed-in user, if any.
 * @param input.role Role required to see the content, if any.
 * @returns "checking" without a session, "denied" for the wrong role, otherwise "allowed".
 */
export const getGateStatus = ({ isReady, user, role }: GateStatusInput): GateStatus => {
  if (!isReady || !user) return "checking";
  return role && user.role !== role ? "denied" : "allowed";
};
