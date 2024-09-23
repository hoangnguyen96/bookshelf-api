import { API_ROUTES } from "@app/constants";
import { User } from "@app/models";
import { api } from "@app/services";

export const getAllUser = async () => {
  const data = await api.get<User[]>(API_ROUTES.USER);

  return data || [];
};

export const getUserById = async (id: string) => {
  try {
    const data = await api.get<User[]>(`${API_ROUTES.USER}?userId=${id}`);

    return data[0];
  } catch (error) {
    return [];
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = (await api.get(`${API_ROUTES.USER}?email=${email}`)) as User[];

    return user;
  } catch (error) {
    return [];
  }
};

export const updateUserById = async (id: string, payload: Partial<User>) => {
  return await api.put(`${API_ROUTES.USER}/${id}`, payload);
};

export const addUser = async (payload: Partial<User>) => {
  return await api.post(API_ROUTES.USER, payload);
};
