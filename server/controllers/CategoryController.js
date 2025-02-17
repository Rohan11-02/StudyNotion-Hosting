const Category = require("../models/Category");
const Course = require("../models/Course");

function getRandomInt(max){
    return Math.floor(Math.random() * max);
} 

exports.createCategory = async(req, res) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(404).json({
                success : false,
                message : "All fields are Mandatory."
            })
        }

        const newCategory = await Category.create({name, description});

        res.status(200).json({
            success : true,
            newCategory,
            message : "New Category created Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issues in Creating Category."
        })
    }
}


exports.showAllCategories = async(req, res) => {
    try{
        const allCategories = await Category.find({},
            {
                name : true,
                description : true,
            }
        )
        res.status(200).json({
            success : true,
            allCategories,
            message : "All Categories fetched Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Facing Issues in fetching Categories."
        })
    }
}


// categoryPageDetails
exports.categoryPageDetails = async(req, res) => {
    try{
        // find courses for given category
        const {categoryId} = req.body;
        if(!categoryId){
            return res.status(404).json({
                success : false,
                message : "Course Category Not found."
            })
        }

        const selectedCategory = await Category.findById(categoryId)
                                                .populate({
                                                    path : "courses",
                                                    match : {status : "Published"},
                                                    populate : {
                                                        path : "ratingAndReview",
                                                        options : {strictPopulate : false}
                                                    }
                                                }).exec();

        if(!selectedCategory){
            return res.status(404).json({
                success : false,
                message : "Data For selected Category not Found."
            })
        }

        if(selectedCategory.courses.length === 0){
            return res.status(404).json({
                success : false,
                message : "No Courses found for the selected Category."
            })
        }

        // courses who category is different
        const categoriesExceptSelected = await Category.find({_id : {$ne : categoryId}});

        let differentCategory = await Category.findOne({
            _id : categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        })
        .populate({
            path : "courses",
            match : {status : "Published"},
            populate : {
                path : "ratingAndReview",
                options : {strictPopulate : false}
            }
        })
        .exec();
    
        // top selling Courses
        const allCategories = await Category.find()
                                            .populate({
                                                path : "courses",
                                                match : {status : "Published"},
                                                populate : {
                                                    path : "instructor"
                                                },
                                                populate : {
                                                        path : "ratingAndReview",
                                                        options : {strictPopulate : false}
                                                }
                                            })

        // console.log("Printing allCategories", allCategories);                                    
        const allCourses = allCategories.flatMap((category) => category.courses);
        // console.log("Printing allCourses", allCourses);
        
        const topSellingCourses = allCourses
                                    .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
                                    .slice(0, 10);

        // console.log("Printing topSellingCourses", topSellingCourses);                            
                                            
        res.status(200).json({
            success : true,
            data : {
                selectedCategory,
                differentCategory,
                topSellingCourses,
            },
            message : "Category Page Details Fetched Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to get Category Page Details."
        })
    }   
}