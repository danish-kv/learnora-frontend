import * as Yup from "yup";

// yup validation schema for course creation
export const validationCourseSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .min(50, "Price must be at least 50 Rupees")
    .positive("Price must be a positive number")
    .required("Price is required"),
  rentalPrice: Yup.number()
    .min(50, "Price must be at least 50 Rupees")
    .positive("Rental price must be positive number"),
  rentalDuration: Yup.number().positive(
    "Rental duration must be a positive number"
  ),
  category: Yup.string().required("Category is required"),
  skill_level: Yup.string().required("Skill level required"),
  thumbnail: Yup.mixed().required("Thumbnail is requied"),
});

// yup validation schema for contest creation
export const validationContestSchema = Yup.object({
  contest_title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title cannot be longer than 200 characters")
    .required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  start_time: Yup.date().required("Start time is required").nullable(),

  end_time: Yup.date()
    .min(Yup.ref("start_time"), "End time must be after the start time")
    .required("End time is required")
    .nullable(),

  time_limit: Yup.string()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
      "Time limit must be in the format HH:MM:SS"
    )
    .required("Time Limit is required"),

  difficulty_level: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Invalid difficulty level")
    .required("Difficulty level is required"),

  max_points: Yup.number()
    .min(1, "Max points must be at least 1")
    .required("Max points are required"),
});

export const validationCommunitySchema = Yup.object({
  name: Yup.string()
    .min(5, "Title must be at least 5 character")
    .max(200, "Name cannot be longer than 200 charaters")
    .required("Contest Name is required"),
  description: Yup.string().required("Description is required"),
  banner: Yup.mixed().required("Banner is required"),
  max_participants: Yup.number().required("Max Participants is required"),
});
