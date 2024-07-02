export interface RequestFileDetailModel {
  fileName: string;
  s3FileName: string;
  fileType: string;
  fileSize: number;
}

export interface RequestGetFileDetailModel {
  page: number;
  limit: number;
  showHidden: Boolean;
}

export interface RequestToggleFileDetailVisibilityModel {
  ids: string[];
  hidden: Boolean;
}

export interface RequestDeleteFileDetailModel {
  ids: string[];
}

export interface ResponseFileDetailModel {
  id: string;
  fileName: string;
  s3FileName?: string;
  fileType: string;
  fileSize: string;
  hidden: Boolean;
  createdAt: Date;
  updatedAt: Date;
  fileUrl?: string;
}

export interface ResponseGetFileDetailModel {
  totalFileDetails: number;
  page: number;
  totalPages: number;
  fileDetails: ResponseFileDetailModel[];
}
