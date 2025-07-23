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
