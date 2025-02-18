import { getUserRole, searchUserPreferences } from '../services/api';

const loadUserDataOnStorage = async () => {
  if (localStorage.getItem('user.role') == null) {
    const userRole = await getUserRole();

    if (
      userRole.data.message &&
      (userRole.data.message == 'Read-only' ||
        userRole.data.message == 'Normal User' ||
        userRole.data.message == 'Admin')
    ) {
      localStorage.setItem('user.role', userRole.data.message);
    }
  }
};

export default loadUserDataOnStorage;
