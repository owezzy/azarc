export interface UserAddressModel {
  recipientName: string;
  buildingName: string;
  streetName: string;
  postTown: string;
  postCode: string;
  officeLocation: workOfficeLocation;
}

export enum workOfficeLocation {
  Los_Angeles = 'Los Angeles',
  Cape_Town = 'Cape Town',
  London = 'London',
}
