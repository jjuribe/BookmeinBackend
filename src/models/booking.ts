
//Class used to create a appointment booking object
export class Booking {
  BookingId!: String;
  BookingDate!: String;
  BookingTime!: String;
  BookingStatus!: String//"Pending" or "Confirmed" or "Cancelled"
  BookingConfirmationCode!: String;
  BookingNotes!: String;
  BookingCreated: Date = new Date(); //default value= current date
  BookingUpdated!: Date;
  BookingCancelled: Boolean=false; //default value=false
  BookingUserId!: String; //username
  BookingServiceProviderId!: String; //username of service provider
}
  
  