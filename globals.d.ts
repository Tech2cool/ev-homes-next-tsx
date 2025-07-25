interface OurProject {
  _id?: string | null;
  showCaseImage?: string | null;
  name?: string | null;
  locationName?: string | null;
  logo?: string | null;
  brochure?: string | null;
  amenities?: Amenity[] | [];
  logo?: string | null;
  description?: string | null;
  carouselImages?: string[] | [];
  contactNumber?: Number | null;
  countryCode?: string | null;
  locationLink?: string | null;
  countryCode?: string | null;
  configurations?: Configuration[] | [];
  shareLink?: string | null;
  address?: string | null;
  shortCode?: string | null;
  showCaseImageLandscape?: string | null;
}

interface Amenity {
  _id?: string | null;
  image?: string | null;
  name?: string | null;
}

interface Configuration {
  carpetArea?: string | null;
  configuration?: string | null;
  image?: string | null;
  price?: string | null;
  reraId?: string | null;
}

interface Testimonial {
  _id?: string | null;
  title?: string | null;
  description?: string | null;
  like?: Number | null;
  dislike?: Number | null;
  videoUrl?: string | null;
  thumbnail?: string | null;
  shareLink?: string | null;
  project?: string | OurProject | null;
  date?: string | null;
  views?: Number | null;
}

//employee
interface Employee {
  _id?: string | null;
  prefix?: string | null;
  email?: string | null;
  profilePic?: string | null;
  employeeId?: string | null;
  password?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  joiningDate?: Date | null;
  dateOfBirth?: Date | null;
  leavedDate?: Date | null;
  address?: string | null;
  bloodGroup?: string | null;
  maritalStatus?: string | null;
  department?: string | Department;
  designation?: string | Designation;
  division?: string | Division;
  reportingTo?: string | Employee;
  phoneNumber?: Number | null;
  status?: string | null;
  remark?: string | null;
  refreshToken: string | null;
}

interface Department {
  _id?: string | null;
  department: string | null;
}

interface Designation {
  _id?: string | null;
  designation: string | null;
}

interface Division {
  _id?: string | null;
  division: string | null;
  location: string | null;
  name: string | null;
  latitude: Number  | null;
  longitude: Number  | null;
  radius: Number  | null;
}
