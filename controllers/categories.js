import categories from "../model/categories.model.js";

const store = async (req, res) => {
    const { name }  = req.body;
    
    try {
        const newCategories = await categories.create({
            name: name,
            userId: req.userId
        });
        res.status(200).json({
            message: "New categories created",
            data: { name: newCategories.name, id: newCategories.id, user: req.userId },
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
    
};

const deleteCategories = async (req, res) => {
    const userId = req.userId;
    
    try {
        // query user based on name
        const category = (await categories.findAll({
            where: {
                id: req.params.id,
                userId: userId,
            },
        }))[0];
        
        // No name return
        //   if name not found return 404
        if (!category) {
            res.status(404).json({ message: "categories not found" });
            return;
            
        }

        else { 
            await category.destroy({
                where: {
                    id: categories.id
                },
            });

            res.status(200).json({ message: "categories deleted", data: { name: category.name, id: category.id } });
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
};

const update = async (req, res) => {
    const {name} = req.body;
    const userId = req.userId;
    
    try {
        // query user based on name
        const category = (await categories.findAll({
            where: {
                id: req.params.id,
                userId: userId,
            },
        }))[0];
        
        // No name return
        //   if name not found return 404
        if (!category) {
            res.status(404).json({ message: "categories not found" });
            return;
            
        }

        else { 
            // Change everyone without a last name to "Doe"
            await category.update({ name: name });
            
            res.status(200).json({ message: "new name for categories updated", data: { name: name, id: category.id }});
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
}

const show = async (req, res) => {
    const userId = req.userId;
    
    try {
        // query user based on name
        const category = (await categories.findAll({
            where: {
                id: req.params.id,
                userId: userId,
            },
        }))[0];
        
        // No name return
        //   if name not found return 404
        if (!category) {
            res.status(404).json({ message: "categories not found" });
            return;
            
        }

        else { 

            res.status(200).json({ message: "categories found", data: { name: category.name, id: category.id }});
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
};

const listing = async (req, res) => {
    const userId = req.userId;
    try {

        const data = (await categories.findAll({ 
            where: {
                userId: userId,
            },
            attributes: ['id', 'name'],
        }));

        res.status(200).json({ message: "categories found", data: data});

        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error });
    }
}

const categoriesController = { store, deleteCategories, update, show, listing };

export default categoriesController;