drop table Feedback;
drop table PatientMatchTherapist;
drop table Therapist;
drop table AmountTable;
drop table FitbitTable;
drop table Patient;
drop table IUser;

create table IUser
(
  UserID   varchar primary key,
  Email    varchar,
  UserName varchar,
  PassWord varchar
);

create table Patient
(
  PatientID   varchar primary key references IUser,
  PatientName varchar
);

create table FitbitTable
(
  PatientID            varchar references Patient,
  Date                 date,
  CaloriesBurned       numeric,
  Steps                int,
  Distance             numeric,
  Floors               int,
  MinutesSedentary     numeric,
  MinutesLightlyActive numeric,
  MinutesFairlyActive  numeric,
  MinutesVeryActive    numeric,
  ActivityCalories     numeric,
  primary key (PatientID, Date)
);

create table AmountTable
(
  PatientID         varchar references Patient,
  Date              date,
  ExerciseTitle     date,
  ExerciseCompleted int,
  Sets              int,
  SetsLeft          int,
  SetsRight         int,
  Repetitions       int,
  RepetitionsLeft   int,
  RepetitionsRight  int,
  Duration          numeric,
  DurationLeft      numeric,
  DurationRight     numeric,
  primary key (PatientID, Date, ExerciseTitle)
);

create table Therapist
(
  TherapistID   varchar primary key references IUser,
  TherapistName varchar
);

create table PatientMatchTherapist
(
  TherapistID varchar references Therapist,
  PatientID   varchar references Patient,
  primary key (TherapistID, PatientID)
);

create table Feedback
(
  FeedbackID  varchar primary key,
  PatientID   varchar references Patient,
  TherapistID varchar references Therapist,
  Content     varchar
)
