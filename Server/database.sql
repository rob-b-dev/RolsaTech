CREATE TABLE Users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_fname VARCHAR(255) NOT NULL,
  user_lname VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_phonenumber VARCHAR(18) NOT NULL
);

CREATE TABLE Booking_details (
    booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    user_email VARCHAR(255) NOT NULL,
    booking_type VARCHAR(16),
    booking_time VARCHAR(12),
    booking_date VARCHAR(16),
    booking_location VARCHAR(12)
);

CREATE TABLE Booking_address (
    booking_id UUID NOT NULL REFERENCES Booking_details(booking_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    address_line VARCHAR(33),
    address_postcode VARCHAR(16),
    PRIMARY KEY (booking_id, user_id)
);

CREATE TABLE Issues (
   issue_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id UUID NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
   user_email VARCHAR(255) NOT NULL,
   issue_details TEXT NOT NULL,
   issue_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
