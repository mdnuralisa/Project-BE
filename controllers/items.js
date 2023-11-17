
import items from "../model/items.model.js";

const storeItem = async (req, res) => {
    const { name, quantity, unit }  = req.body;
    const category_id = req.category_id;

    try {
        const item = await items.create({
            name: name,
            categoryId: category_id,
            quantity: quantity,
            unit: unit,
        });
        res.status(200).json({
            message: "New items created",
            data: { name: item.name, id: item.id, categoryId: category_id, quantity:item.quantity, unit:item.unit },
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error: error });
    }
    
};

const deleteItem = async (req, res) => {
    const category_id = req.category_id;
    
    try {
        // query user based on name
        const item = (await items.findAll({
            where: {
                id: req.params.id,
                categoryId: category_id,
            },
        }))[0];
        
        // No name return
        //   if name not found return 404
        if (!item) {
            res.status(404).json({ message: "item not found" });
            return;
            
        }

        else { 
            await item.destroy({
                where: {
                    id: item.id
                },
            });

            res.status(200).json({ message: "item deleted", data: { name: item.name, id: item.id } });
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
};

const updateItem = async (req, res) => {
    const { name, quantity, unit } = req.body;
    const category_id = req.category_id;
    
    try {
        // query user based on name
        const item = (await items.findAll({
            where: {
                id: req.params.id,
                categoryId: category_id,
            },
        }))[0];
        
        // No name return
        //   if name not found return 404
        if (!item) {
            res.status(404).json({ message: "item not found" });
            return;
            
        }

        else { 
            // Change everyone without a last name to "Doe"
            await item.update({ name: name, quantity: quantity, unit: unit  });
            
            res.status(200).json({ message: "item updated", data: { name: name, quantity: quantity, unit: unit, id: item.id }});
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
}

const showItem = async (req, res) => {
    const category_id = req.category_id;
    
    try {
        // query user based on name
        const item = (await items.findAll({
            where: {
                id: req.params.id,
                category_id: category_id,
            },
        }))[0];
        
        // No name return
        //   if name not found return 404
        if (!item) {
            res.status(404).json({ message: "item not found" });
            return;
            
        }

        else { 

            res.status(200).json({ message: "item found", data: { name: item.name, quantity: item.quantity, unit: item.unit, id: item.id }});
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
};

const listingItem = async (req, res) => {
    const category_id = req.category_id;
    try {

        const data = (await items.findAll({ 
            where: {
                category_id: category_id,
            },
            order: [
                ['name', 'ASC'],
            ],
            attributes: ['id', 'name' , 'quantity', 'unit'],
        }));

        res.status(200).json({ message: "items found", data: data});

        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error });
    }
}

const itemsController = { storeItem, deleteItem, updateItem, showItem, listingItem };

export default itemsController;