export interface IEditUsers {
  userId: any;
  roleId: any;
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface IGetUsersSearch {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}
