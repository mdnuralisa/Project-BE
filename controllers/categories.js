import categories from "../model/categories.model.js";

const store = async (req, res) => {
    const { name }  = req.body;
    
    try {
        const newCategories = await categories.create({
            name: name,
        });
        res.status(200).json({
            message: "New categories created",
            data: { name: newCategories.name, id: newCategories.id  },
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
    
};

const deleteCategories = async (req, res) => {
    const { name } = req.body;
    
    try {
        
        // query user based on name
        const existCategories = await categories.findOne({
            where: {
                name: name,
            },
        });
        
        // No name return
        //   if name not found return 404
        if (!existCategories) {
            res.status(404).json({ message: "categories not found" });
            return;
        }
        
        else // Delete 
        {await existCategories.destroy({
            where: {
                id: categories.id
            },
        });};
        
        res.status(200).json({ message: "categories deleted" });
        return;
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
}

const update = async (req, res) => {
    const { name, newName } = req.body;
    try {
        // query user based on name
        const existCategories = await categories.findOne({
            where: {
                name: name,
            },
        });
        
        // No name return
        //   if name not found return 404
        if (!existCategories) {
            res.status(404).json({ message: "categories not found" });
            return;
        }
        else { 
            // Change everyone without a last name to "Doe"
            await categories.update({ name: newName }, {
                where: {
                    id: existCategories.id,
                },
            });
            
            res.status(200).json({ message: "new name for categories updated", data: { name: newName, id: existCategories.id }});
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
}

const show = async (req, res) => {
    const { name } = req.body;
    try {
        // query user based on name
        const existCategories = await categories.findOne({
            where: {
                name: name,
            },
        });
        
        // No name return
        //   if name not found return 404
        if (!existCategories) {
            res.status(404).json({ message: "categories not found" });
            return;
        }
        else {            
            res.status(200).json({ message: "categories found", data: {id: existCategories.id} });
            return;           
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
}

const listing = async (req, res) => {
    try {

        const alldata =await categories.findAll({raw:true});

        res.status(200).json({ message: "List of categories", data: {alldata} });

        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
}

const categoriesController = { store, deleteCategories, update, show, listing };

export default categoriesController;