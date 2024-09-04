import * as Yup from 'yup'

 export const validationCourseSchema = Yup.object({
    title : Yup.string().min(5, 'Title must be at least 5 characters').required('Title is required'),
    description : Yup.string().required('Description is required'),
    price : Yup.number().min(50, 'Price must be at least 50 Rupees').positive('Price must be a positive number').required('Price is required'),
    rentalPrice : Yup.number().min(50, 'Price must be at least 50 Rupees').positive('Rental price must be positive number'),
    rentalDuration : Yup.number().positive('Rental duration must be a positive number'),
    category : Yup.string().required('Category is required'),
    skill_level : Yup.string().required('Skill level required'),
    thumbnail : Yup.mixed().required('Thumbnail is requied')

})



