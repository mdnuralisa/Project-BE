import categories from "../model/categories.model.js";

const isCategoryOwner = async  (req, res, next) => {
  try {

    const category_id = req.params.category_id;
    
    const category = (await categories.findAll ({
        where: {
            id: category_id,
            userId: req.userId,
        },
    }))[0];

    // console.log('>>>')
    // console.log(category)

    if (!category) return res.status(401).json({ message: "Unauthorised resource" });

    req.category_id = category_id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorised", error });
    console.log(error)
  }
};

export default isCategoryOwner;