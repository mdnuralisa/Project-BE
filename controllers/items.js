
import items from "../model/items.model.js";

const store = async (req, res) => {
    const { name }  = req.body;
    const category_id = req.category_id;

    try {
        const item = await items.create({
            name: name,
            categoryId: category_id,
        });
        res.status(200).json({
            message: "New items created",
            data: { name: item.name, id: item.id, categoryId: category_id },
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
    const {name} = req.body;
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
            res.status(404).json({ message: "categories not found" });
            return;
            
        }

        else { 
            // Change everyone without a last name to "Doe"
            await item.update({ name: name });
            
            res.status(200).json({ message: "new name for categories updated", data: { name: name, id: item.id }});
            return;
            
        }  
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
}

// const show = async (req, res) => {
//     const userId = req.userId;
    
//     try {
//         // query user based on name
//         const category = (await categories.findAll({
//             where: {
//                 id: req.params.id,
//                 userId: userId,
//             },
//         }))[0];
        
//         // No name return
//         //   if name not found return 404
//         if (!category) {
//             res.status(404).json({ message: "categories not found" });
//             return;
            
//         }

//         else { 

//             res.status(200).json({ message: "categories found", data: { name: category.name, id: category.id }});
//             return;
            
//         }  
        
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error });
//     }
// };

// const listing = async (req, res) => {
//     const userId = req.userId;
//     try {

//         const data = (await categories.findAll({ 
//             where: {
//                 userId: userId,
//             },
//             order: [
//                 ['name', 'ASC'],
//             ],
//             attributes: ['id', 'name'],
//         }));

//         res.status(200).json({ message: "categories found", data: data});

//         return;
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error", error: error });
//     }
// }

const itemsController = { store, deleteItem, updateItem };

export default itemsController;