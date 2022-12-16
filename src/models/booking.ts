
// Class used to create a appointment booking object
export class Booking {
  _id!: string;
  startDate!: Date;
  endDate!: Date;
  status!: string//"Pending" or "Confirmed" or "Cancelled"
  confirmationCode!: string;
  notes!: string;
  dateCreated!: Date;
  dateLastModified!: Date;
  userId!: string; //username
  organisationId!: string; //username of service provider
}
  
  