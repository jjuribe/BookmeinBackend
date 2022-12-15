
//Class used to create a appointment booking object
export class Booking {
  Id!: String;//Id of the booking
  Date!: String;//Date of the booking
  Time!: String;//Time of the booking
  Status!: String; //"Pending" or "Confirmed" or "Cancelled"
  ConfirmationCode!: String;//Confirmation code for the booking
  Notes!: String; //Notes about the appointment
  Created: Date = new Date(); //default value= current date
  Updated!: Date; //default value= current date
  Cancelled: Boolean = false; //default value=false
  UserId!: String; //UserId of the user who made the booking
  ServiceProviderId!: String; //username of service provider
  OrganizationName!: String;//Organization name of the service provider
  //QRCode!: String;//QR code for the booking to be scanned at the service provider's location
}
  
  