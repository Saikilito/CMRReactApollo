export default{
    Query:{
        topClients: async (parents, args, {models:{Order}}) => {
            try{
                const totalOrder = await Order.aggregate([
                    {
                        $match: { estado: "COMPLETADO"}
                    },
                    {
                        $group:{
                            _id: "$cliente",
                            total: { $sum: "$total"}
                        }
                    },
                    {
                        $lookup:{
                            from: "clients",
                            localField:'_id',
                            foreignField: '_id',
                            as: 'client'
                        }
                    },
                    {
                        $sort: { total: -1 }
                    },
                    {
                        $limit: 10
                    }
                ])
                .catch(err => console.log(err))
                console.log("ORDER",totalOrder)
                return totalOrder
            }
            catch(err){
                console.log(err)
                return false
            }
        }
    }
}