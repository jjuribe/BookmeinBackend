
//Class used to create an organization object
export class Organization {
  _id?: string;
  name!: string;
  description!: string;
  address!: string;
  phone!: string;
  email!: string;
  serviceProviderId!: string; // id of the organization admin
  status: string = "Active"; //Active or Inactive
}
    
    