export interface IClientProfile {
  emails: string[];
  phones: string[];
  name: string;
}

export interface IClient {
  username: string;
  profile: IClientProfile;
}

export interface IFoundItem {
  id: number;
  reference: string;
  type: 'pickup' | 'delivery';
  date: number;
  statusCode: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  barcodes?: string[];
  client: IClient;
}
