import { IS_API_ENABLED } from "@/lib/shared/http/api.constants";

import * as mock from "./auth.mock";
import * as remote from "./auth.remote";

const source = IS_API_ENABLED ? remote : mock;

export const toPublicUser = mock.toPublicUser;
export const userRepository = source.userRepository;
export const listUsers = source.listUsers;
export const login = source.login;
export const register = source.register;
export const logout = source.logout;
export const getCurrentUser = source.getCurrentUser;
export const updateUser = source.updateUser;
export const updateProfile = source.updateProfile;
export const changePassword = source.changePassword;
